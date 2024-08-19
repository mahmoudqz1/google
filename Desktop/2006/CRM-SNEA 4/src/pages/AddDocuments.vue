<script>
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/firebaseConfig' // Ensure this path matches your Firebase initialization

export default {
  name: 'AddDocuments',
  props: {
    lead: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      documentType: '',
      documentFile: null,
      documentTypes: ['CIN', 'RIB', 'Devoirs de conseil'],
      uploadedDocuments: [],
      selectedDocumentUrl: '',
      selectedDocumentType: '',
      showModal: false,
    }
  },
  mounted() {
    this.fetchUploadedDocuments()
  },
  methods: {
    async submitDocument() {
      try {
        let folderName = ''
        let documentName = ''
        switch (this.documentType) {
        case 'CIN':
          folderName = 'cin'
            documentName = 'cin.png'
            break;
        case 'RIB':
          folderName = 'rib'
            documentName = 'rib.png'
            break;
        case 'Devoirs de conseil':
          folderName = 'devoirs'
            documentName = 'devoirs.pdf'
            break;
        default:
          folderName = 'other' // Handle any other document types
            documentName = 'other.pdf'
            break;
        }

        const storageRef = ref(storage, `Lead/${this.lead.id}/${folderName}/${documentName}`)

        await uploadBytes(storageRef, this.documentFile)

        // Get download URL for the uploaded file
        const downloadURL = await getDownloadURL(storageRef)

        console.log('Document uploaded to:', downloadURL)

        // Update the uploaded documents list
        this.uploadedDocuments.push({ type: this.documentType, url: downloadURL })

        // Clear form after successful upload
        this.documentType = ''
        this.documentFile = null
      }
      catch (error) {
        console.error('Error uploading document:', error)

        // Handle error scenario (e.g., show error message to user)
      }
    },
    async fetchUploadedDocuments() {
      try {
        const baseRef = ref(storage, `Lead/${this.lead.id}`)
        const result = await listAll(baseRef)

        const documents = await Promise.all(
          result.prefixes.map(async folderRef => {
            const fileResult = await listAll(folderRef)
            const url = await getDownloadURL(fileResult.items[0])
            const type = folderRef.name.toUpperCase()

            return { type, url }
          }),
        )

        this.uploadedDocuments = documents
      }
      catch (error) {
        console.error('Error fetching uploaded documents:', error)
      }
    },
    viewDocument(url, type) {
      this.selectedDocumentUrl = url
      this.selectedDocumentType = type
      this.showModal = true
    },
    downloadDocument(url) {
      // Create an anchor element and programmatically click it to trigger download
      const link = document.createElement('a')

      link.href = url
      link.download = '' // You can set the filename here if needed
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    closeModal() {
      this.showModal = false
      this.selectedDocumentUrl = ''
      this.selectedDocumentType = ''
    },
  },
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol
        cols="12"
        md="8"
        class="mx-auto"
      >
        <VCard class="mb-6">
          <VCardTitle class="headline">
            Add Documents for Lead {{ lead.name }}
          </VCardTitle>
          <VCardText>
            <VForm @submit.prevent="submitDocument">
              <VSelect
                v-model="documentType"
                :items="documentTypes"
                label="Document Type"
                outlined
                required
                class="mb-4"
              />
              <VFileInput
                ref="fileInput"
                v-model="documentFile"
                label="Upload Document"
                outlined
                required
                accept=".png,.pdf"
                class="mb-4"
              />
              <VBtn
                type="submit"
                color="primary"
                class="mx-auto"
              >
                Submit
              </VBtn>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle class="headline">
            Uploaded Documents
          </VCardTitle>
          <VCardText>
            <VRow>
              <VCol
                v-for="doc in uploadedDocuments"
                :key="doc.type"
                cols="12"
                md="4"
              >
                <VCard class="document-card">
                  <VCardTitle class="subheading">
                    {{ doc.type }}
                  </VCardTitle>
                  <VCardText class="document-preview">
                    <div v-if="doc.type === 'CIN' || doc.type === 'RIB'">
                      <img
                        :src="doc.url"
                        alt="Document Preview"
                        class="document-thumbnail"
                      >
                    </div>
                    <div v-else-if="doc.type === 'Devoirs de conseil'">
                      <VResponsive aspect-ratio="16/9">
                        <iframe
                          :src="doc.url"
                          type="application/pdf"
                          class="document-thumbnail"
                        />
                      </VResponsive>
                    </div>
                    <div class="document-overlay">
                      <VIcon
                        small
                        class="icon"
                        @click="viewDocument(doc.url, doc.type)"
                      >
                        mdi-eye
                      </VIcon>
                      <VIcon
                        small
                        class="icon"
                        @click="downloadDocument(doc.url)"
                      >
                        mdi-download
                      </VIcon>
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VDialog
      v-model="showModal"
      max-width="800px"
    >
      <VCard>
        <VCardTitle>
          Viewing Document
          <VSpacer />
          <VIcon
            class="close-icon"
            @click="closeModal"
          >
            mdi-close
          </VIcon>
        </VCardTitle>
        <VCardText>
          <div v-if="selectedDocumentType === 'CIN' || selectedDocumentType === 'RIB'">
            <img
              :src="selectedDocumentUrl"
              alt="Document Preview"
              class="document-full"
            >
          </div>
          <div v-else-if="selectedDocumentType === 'Devoirs de conseil'">
            <VResponsive aspect-ratio="16/9">
              <iframe
                :src="selectedDocumentUrl"
                type="application/pdf"
                class="document-full"
              />
            </VResponsive>
          </div>
        </VCardText>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<style scoped>
.headline {
  font-weight: bold;
  text-align: center;
  color: #3f51b5;
  margin-bottom: 20px;
}

.subheading {
  font-weight: bold;
  text-align: center;
  color: #3f51b5;
}

.document-card {
  position: relative;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.2s;
}

.document-card:hover {
  transform: scale(1.05);
}

.document-preview {
  position: relative;
  height: 150px;
}

.document-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.document-full {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.document-overlay {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 4px;
  border-radius: 4px;
}

.icon {
  cursor: pointer;
  margin-left: 4px;
  color: #3f51b5;
}

.close-icon {
  cursor: pointer;
  color: #3f51b5;
}
</style>
