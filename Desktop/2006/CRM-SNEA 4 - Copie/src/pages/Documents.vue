<script>
import { onMounted, ref } from 'vue'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export default {
  name: 'Documents',
  props: {
    leadId: String,
  },
  setup(props) {
    const documentName = ref('')
    const documentFile = ref(null)
    const documents = ref([])

    const documentHeaders = [
      { text: 'Document Name', value: 'name' },
      { text: 'Actions', value: 'actions' },
    ]

    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, `Lead/${props.leadId}/Documents`))

      documents.value = querySnapshot.docs.map(doc => doc.data())
    }

    const uploadDocument = async () => {
      if (documentName.value && documentFile.value) {
        await addDoc(collection(db, `Lead/${props.leadId}/Documents`), {
          name: documentName.value,
          file: documentFile.value.name,
        })
        await fetchDocuments()
      }
    }

    onMounted(() => {
      fetchDocuments()
    })

    return {
      documentName,
      documentFile,
      documents,
      documentHeaders,
      uploadDocument,
    }
  },
}
</script>

<template>
  <div>
    <h1>Documents</h1>
    <VContainer>
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="documentName"
            label="Document Name"
            outlined
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VFileInput
            v-model="documentFile"
            label="Upload Document"
            outlined
          />
        </VCol>
        <VCol
          cols="12"
          class="text-center"
        >
          <VBtn
            color="primary"
            variant="tonal"
            @click="uploadDocument"
          >
            Upload
          </VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VDataTable
            :headers="documentHeaders"
            :items="documents"
          />
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .v-container {
    margin-top: 20px;
  }

  .v-row {
    margin-bottom: 20px;
  }

  .text-center {
    text-align: center;
  }
  </style>
