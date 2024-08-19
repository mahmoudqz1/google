<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AutoMotoForm',
  setup() {
    const currentSection = ref('souscripteur')

    const souscripteur = ref({
      civilite: '',
      nom: '',
      prenom: '',
      dateNaissance: '',
      profession: '',
      telephone: '',
      adresseMail: '',
      adressePostale: '',
      type_assurance: '',
    })

    const antecedentsAssurance = ref({
      bonusMalus: '',
      moisAssurance: '',
      motifResiliation: '',
      sinistreMaterielResponsable: '',
      sinistreMaterielNonResponsable: '',
      sinistreCorporelResponsable: '',
      sinistreCorporelNonResponsable: '',
      brisDeGlace: '',
      vol: '',
    })

    const antecedentsSouscripteur = ref({
      suspensionAlcoolemie: '',
      suspensionStupefiants: '',
      suspensionPoints: '',
      annulationPoints: '',
      moisSuspension: '',
    })

    const vehicule = ref({
      marque: '',
      modele: '',
      puissanceFiscale: '',
      premiereMiseEnCirculation: '',
      immatriculation: '',
      usage: '',
    })

    const type_assuranceOptions = ref(['auto', 'moto', 'cyclo', 'vsp'])

    const garanties = ref([
      { name: 'Responsabilité civile', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Défense pénale et Recours', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Protection juridique', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Garantie conducteur', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Assistance', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Bris de Glace', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Vol-Incendie', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Catastrophes naturelles', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Catastrophes technologiques', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Attentats', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Dommages tous accidents', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Véhicule de remplacement', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Remboursement de franchise', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Panne mécanique', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Contenu du véhicule', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Indemnisation plus', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Garantie Gilet Airbag', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Garantie Casque', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Vol, Incendie, Explosion, Forces de la nature', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Equipement (option)', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
      { name: 'Responsabilité civile professionnelle', contact: false, contactPlus: false, confort: false, serenite: false, plafond: '' },
    ])

    const produitAssurance = ref('')
    const formule = ref('')
    const partenaire = ref('')
    const primeAnnuelle = ref('')
    const fraisCourtage = ref('')
    const sommeADebiter = ref('')
    const fraisDossiers = ref('')
    const acompteCompagnie = ref('')
    const dateReglement1 = ref('')
    const montantAout2024 = ref('')
    const dateReglement2 = ref('')
    const dateToday = ref('')

    const handleSubmit = () => {
      const data = {
        souscripteur: souscripteur.value,
        antecedentsAssurance: antecedentsAssurance.value,
        antecedentsSouscripteur: antecedentsSouscripteur.value,
        vehicule: vehicule.value,
        produitAssurance: produitAssurance.value,
        formule: formule.value,
        partenaire: partenaire.value,
        primeAnnuelle: primeAnnuelle.value,
        fraisCourtage: fraisCourtage.value,
        sommeADebiter: sommeADebiter.value,
        fraisDossiers: fraisDossiers.value,
        acompteCompagnie: acompteCompagnie.value,
        dateReglement1: dateReglement1.value,
        montantAout2024: montantAout2024.value,
        dateReglement2: dateReglement2.value,
        dateToday: dateToday.value,
        garanties: garanties.value,
      }

      const htmlTemplate = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devoir de conseil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Your existing CSS styles */
    </style>
</head>
<body>
    <div class="no-print">
        <button class="btn btn-success" onclick="window.print()" style="display: inline-block; margin-right: 10px;">Sauvegarder</button>
    </div>
    <div class="container-fluid">
        <header class="row header">
            <div class="col-2 header-logo">
                <img src="path/to/logo.png" alt="Logo de la société" class="img-fluid">
            </div>
            <div class="col-8 header-info">
                <small>CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200 USSEL – France</small>
                <small>Tél : 05 19 79 97 69 email : contact@carrezconseil.fr</small>
                <small>RCS Brive 830 933 040 – Numéro ORIAS 17005138 – www.orias.fr</small>
                <small>Activité des agents et courtiers d’assurances (6622Z)</small>
            </div>
            <div class="col-2 header-advisor">
                <h5>Votre Conseiller : <br> <b>${data.souscripteur.nom} ${data.souscripteur.prenom}</b></h5>
            </div>
        </header>
        <div class="section">
            <h5>FICHE D’INFORMATIONS ET DE CONSEILS CONFORMEMENT AUX ARTICLES L 520-1. ET R 520-1 DU CODE DES ASSURANCES
            </h5>
        </div>
        <div class="row justify-content-center ">
            <div class="col-6 section-courier">
                <h4 class="section-title">I-Courtier conseil :</h4>
                <p>Ce contrat est commercialisé par la société CARREZ CONSEIL ASSURANCES, courtier d’assurance de
                    catégorie B – immatriculé à l’Orias (Registre unique des intermédiaires en assurance) sous le numéro
                    17 005 138 (www.orias.fr) et au RCS de Brive n° 830 933 040. Le siège social de la société CARREZ
                    CONSEIL ASSurances est situé au 3 rue du pré d’Aubiat 19200 USSEL La catégorie juridique de la
                    société CARREZ CONSEIL est une SARL au capital de 2 500 €.</p>
                <p>La société CARREZ CONSEIL ASSURANCES ne détient aucune participation directe ou indirecte d’une
                    compagnie d’assurance. Aucune compagnie d’assurance ne détient de participation directe ou indirecte
                    dans la société Carrez conseil assurance.</p>
                <p>La société CARREZ CONSEIL ASSURANCES exerce son activité de courtage d’assurance conformément aux
                    articles *** L.520-1 et R-511-2-l du code des assurances***. Le nom des entreprises d’assurance avec
                    lesquelles la société CARREZ CONSEIL ASSURANCES travaille en qualité de courtier est disponible sur
                    simple demande.</p>
                <p>En cas de difficulté dans l’application du contrat d’assurance, vous pouvez adresser votre
                    réclamation par courrier à CARREZ CONSEIL ASSURANCES service réclamation à l’adresse du siège social
                    ou par email :</p>
                <p>reclamation@carrezconseil.fr ou gestion.iard@carrezconseil.fr ou m.luc@carrezconseil.fr</p>
                <small>Vous recevrez un accusé de réception au maximum sous 10 jours et une réponse dans un délai
                    maximum de 2 mois. Si la réponse ne vous satisfait pas, vous pourrez demander l’avis d’un médiateur
                    : La Médiation de l’assurance, TSA 50110, 75441 PARIS CEDEX 9 (www.mediation-assurance.org).</small>
                <small>En cas d’échec de votre réclamation vous pouvez vous adresser au Médiateur de l’Assurance soit
                    par courrier à La Médiation de l’Assurance, Pole CSCA, TSA 50110 75441 Paris Cedex 09, ou par mail :
                    le.mediateur@mediation-assurance.org.fr</small>
            </div>
            <div class="col-6 section-courier">
                <h4 class="section-title">II-Informations légales :</h4>
                <section class="text-center">
                    <p>CARREZ CONSEIL ASSURANCES</p>
                    <p>3 rue du pré d’Aubiat 19200 USSEL</p>
                    <p>Tél : 05 19 79 97 69 @ : contact@carrezconseil.fr</p>
                    <p>RCS de Brive 830 933 040</p>
                    <p>N° Orias : 17 005 138 vérifications sur le site de l’Orias : www.orias.fr</p>
                    <p>Sous le contrôle de l’Autorité Prudentiel et de Résolution (ACPR) 4 place de Budapest , 75436
                        Paris
                        Cedex 9</p>
                </section>
                <p>En application des articles L.520-1- III du code des assurances, cette étude personnalisée a pour
                    objectif de définir de façon claire et exacte vos besoins afin de vous proposer le contrat le mieux
                    adapté à votre situation.</p>
                <p>Nous attirons votre attention sur le fait que la fourniture d’une information complète et sincère est
                    une condition indispensable à la délivrance d’un conseil adapté.</p>
                <p>Les données à caractère personnel recueillies sont nécessaires pour conclure le présent contrat et
                    pourront être utilisées par l’assureur et ses partenaires.</p>
                <p>A défaut de réponse à une question, une réponse incomplète ou erronée risque de compromettre la
                    fiabilité et/ou la pertinence de cette étude et donc des solutions qui seront amenées à vous être
                    proposées.</p>
                <p>Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, vous
                    bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent, que vous
                    pouvez exercer en vous adressant à siège social de la société CARREZ CONSEIL ASSURANCES.</p>
            </div>
            <div class="col-12 section-courier">
                <h4 class="section-title">III-Remarques importantes :</h4>
                <p>Vous reconnaissez avoir pris connaissance du contenu du présent document préalablement à l’adhésion
                    au contrat d’assurance proposé ci-dessus, en avoir conservé un exemplaire, et avoir reçu une
                    information détaillée sur l’étendue, la définition des risques et des garanties proposées.</p>
                <p>Aussi précis que soient les informations et les conseils qui vous ont été donnés, il est très
                    important que vous lisiez attentivement les notices de votre précontrat d’assurance qui vous seront
                    remises au moment de votre adhésion. Ces notices constituent le document juridique contractuel
                    exprimant les droits et obligations de l’assuré et de l’assureur.</p>
                <p>Nous insistons sur l’importance de la précision et de la sincérité des réponses apportées dans la
                    demande d’adhésion. Une fausse déclaration intentionnelle entraînerait la nullité du contrat et la
                    déchéance de vos garanties.</p>
            </div>
        </div>
        <footer class="bg-light py-2 text-center">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <small>CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200 USSEL – France</small>
                        <small>Tél : 05 19 79 97 69 email : contact@carrezconseil.fr</small>
                        <small>RCS Brive 830 933 040 – Numéro ORIAS 17005138 – www.orias.fr</small>
                        <small>Activité des agents et courtiers d’assurances (6622Z)</small>
                    </div>
                </div>
            </div>
        </footer>
        <div class="end-section"></div>
        <header class="bg-light py-2 text-center">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-inline-block align-middle">
                            <img src="path/to/logo.png" alt="Logo de la société" class="img-fluid" style="height: 30px;">
                        </div>
                        <div class="d-inline-block align-middle">
                            <small class="mb-0">Carrez Conseil Assurances</small>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="row">
            <div class="col-6 section-courier contract-details align-items-center ">
                <div class="centered-title">
                    <h5>Le souscripteur ou le conducteur principal</h5>
                </div>
                <p>Civilité : <span>${data.souscripteur.civilite}</span></p>
                <p>Nom Prénom : <span>${data.souscripteur.nom} ${data.souscripteur.prenom}</span></p>
                <p>Date de naissance : <span>${data.souscripteur.dateNaissance}</span></p>
                <p>Profession : <span>${data.souscripteur.profession}</span></p>
                <p>Numéro de téléphone : <span>${data.souscripteur.telephone}</span></p>
                <p>Adresse mail : <span>${data.souscripteur.adresseMail}</span></p>
                <p>Adresse postale : <span>${data.souscripteur.adressePostale}</span></p>
                <p class="text-center">Nous a consulté pour une assurance, <span>${data.souscripteur.type_assurance}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Les antécédents d’assurance</h5>
                </div>
                <p>Coefficient Bonus-Malus : <span>${data.antecedentsAssurance.bonusMalus}</span></p>
                <p>Nombre de mois d’assurances : <span>${data.antecedentsAssurance.moisAssurance}</span></p>
                <p>Motif de résiliation : <span>${data.antecedentsAssurance.motifResiliation}</span></p>
                <p>Nombre de sinistre matériel responsable : <span>${data.antecedentsAssurance.sinistreMaterielResponsable}</span></p>
                <p>Nombre de sinistre matériel non responsable : <span>${data.antecedentsAssurance.sinistreMaterielNonResponsable}</span></p>
                <p>Nombre de sinistre corporel responsable : <span>${data.antecedentsAssurance.sinistreCorporelResponsable}</span></p>
                <p>Nombre de sinistre corporel non responsable : <span>${data.antecedentsAssurance.sinistreCorporelNonResponsable}</span></p>
                <p>Nombre de bris de glace : <span>${data.antecedentsAssurance.brisDeGlace}</span></p>
                <p>Nombre de vol : <span>${data.antecedentsAssurance.vol}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Les antécédents du souscripteur</h5>
                </div>
                <p>Suspension de permis suite à alcoolémie : <span>${data.antecedentsSouscripteur.suspensionAlcoolemie}</span></p>
                <p>Suspension de permis suite à usage de stupéfiants : <span>${data.antecedentsSouscripteur.suspensionStupefiants}</span></p>
                <p>Suspension de permis pour perte de points : <span>${data.antecedentsSouscripteur.suspensionPoints}</span></p>
                <p>Annulation de permis pour perte de points : <span>${data.antecedentsSouscripteur.annulationPoints}</span></p>
                <p>Nombre de mois de suspension : <span>${data.antecedentsSouscripteur.moisSuspension}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Le véhicule</h5>
                </div>
                <p>Marque : <span>${data.vehicule.marque}</span></p>
                <p>Modèle : <span>${data.vehicule.modele}</span></p>
                <p>Puissance fiscale : <span>${data.vehicule.puissanceFiscale} CV</span></p>
                <p>1ère mise en circulation : <span>${data.vehicule.premiereMiseEnCirculation}</span></p>
                <p>Immatriculation : <span>${data.vehicule.immatriculation}</span></p>
                <p>Usage : <span>${data.vehicule.usage}</span></p>
            </div>

            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-11 text-center">
                        <div class="centered-title">
                            <h5>Vos exigences et besoins</h5>
                        </div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>GARANTIES</th>
                                    <th>CONTACT</th>
                                    <th>CONTACT+</th>
                                    <th>CONFORT</th>
                                    <th>SERENITE</th>
                                    <th>FRANCHISES / PLAFOND</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.garanties.map(garantie => `
                                <tr>
                                    <td>${garantie.name}</td>
                                    <td>${garantie.contact ? '✔' : ''}</td>
                                    <td>${garantie.contactPlus ? '✔' : ''}</td>
                                    <td>${garantie.confort ? '✔' : ''}</td>
                                    <td>${garantie.serenite ? '✔' : ''}</td>
                                    <td>${garantie.plafond}</td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <p style="line-height: 0.5; font-size: 12px;">Selon les informations de votre véhicule et vos besoins, nous vous
                            conseillons le produit
                            Assurance
                            <b>${data.produitAssurance}</b>
                        </p>
                        <p style="line-height: 0.5; font-size: 12px;">Pour la formule <b>${data.formule}</b> Auprès de notre partenaire
                            <b>${data.partenaire}</b>.
                        </p>
                    </div>
                </div>
            </div>
            <footer class="bg-light py-2 text-center">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <small>CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200 USSEL – France</small>
                            <small>Tél : 05 19 79 97 69 email : contact@carrezconseil.fr</small>
                            <small>RCS Brive 830 933 040 – Numéro ORIAS 17005138 – www.orias.fr</small>
                            <small>Activité des agents et courtiers d’assurances (6622Z)</small>
                        </div>
                    </div>
                </div>
            </footer>
            <div class="end-section"></div>
            <header class="bg-light py-2 text-center">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="d-inline-block align-middle">
                                <img src="path/to/logo.png" alt="Logo de la société" class="img-fluid" style="height: 30px;">
                            </div>
                            <div class="d-inline-block align-middle">
                                <small class="mb-0">Carrez Conseil Assurances</small>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="contract-content">
                <small>L’article L 112-2-1 du Code des Assurances prévoit, en cas de vente
                    à distance, une faculté de
                    renoncer au contrat dans un délai de 14 jours à compter de la date de souscription, sans motif ni
                    pénalité. Toutefois, par dérogation, ce droit à renonciation ne s’applique pas aux contrats
                    d’assurance
                    mentionnés à l'article L 211-1 du même code couvrant la responsabilité civile des Véhicules
                    terrestres à
                    moteur. En conséquence, si vous souhaitez souscrire maintenant, vous êtes informé qu'à compter de la
                    prise d'effet de vos garanties, vous ne disposez pas de droit à renonciation.</small>
                <p>La prime annuelle s'élève à <b>${data.primeAnnuelle} €</b> et ( <b>${data.moisAssurance} mois</b>) taxes incluses,
                    Frais de courtage :
                    <b>${data.fraisCourtage} €</b>.
                </p>
                <p>Le client reconnaît avoir pris connaissance de contenu du présent document préalablement à la
                    signature
                    du contrat d’assurance proposé ci-dessus.</p>
                <p>Nous sommes rémunérés sur la base d’une commission incluse dans la prime d’assurance, de frais de
                    courtage annexes ainsi que d’honoraires dont le montant vous est communiqué sur la facture qui vous
                    est
                    remise par ailleurs (articleL521-2-II-2°d) du Code des assurances.</p>
                <p>Nous vous délivrerons votre carte verte définitive avant l'expiration de la carte verte provisoire, à
                    condition que vous nous envoyiez rapidement l'ensemble des documents nécessaires à la finalisation
                    du
                    dossier, à savoir :</p>
                <ul>
                    <li>Les conditions particulières signés et paraphés</li>
                    <li>Les relevés d'information</li>
                    <li>La carte grise définitive ou certificat d'immatriculation</li>
                    <li>Le mandat SEPA signé</li>
                    <li>Le RIB</li>
                    <li>La copie recto verso du permis de conduire</li>
                    <li>L’acompte : 1 ou 2 mois d'assurance selon la compagnie</li>
                    <li>Les frais d'audits et de gestion</li>
                </ul>
                <p>À Noter que les honoraires de courtage et frais de dossier sont prélevé automatiquement en paiement
                    différé CB, en cas de rejet de paiement le montant réclamé sera prélevé automatiquement en totalité
                    ou en plusieurs partie dés approvisionnement de votre compte.</p>
                <p>À noter qu'après étude de ces documents par la compagnie d'assurance, il peut vous être demandé de
                    fournir des documents supplémentaires avant la validation de votre dossier et l'envoi de la carte
                    verte
                    définitive.</p>
                <p>À noter également qu'en cas de non réception des documents nécessaires à la validation de votre
                    dossier
                    (cf. ci-dessus) dans les délais (avant l'expiration de la carte verte provisoire), votre contrat
                    d'assurance auto sera résilié.</p>
                <p>À noter finalement qu'en cas de réception de documents dont les informations sont non conformes à ce
                    que
                    vous avez déclaré avant la prise de la garantie provisoire (et donc non conformes à ce qui figure
                    sur le
                    devis ci-joint), soit votre contrat d'assurance sera résilié par la compagnie, soit un avenant vous
                    sera
                    proposé pour que votre dossier soit régularisé.
                    En signant ce document, vous confirmez votre accord et vous attestez l'exactitude de l'ensemble de
                    vos
                    déclarations qui figurent sur le devis ci-joint, notamment celles relatives à votre véhicule, vos
                    antécédents d'assurance et infractions ou retraits de permis... Vous attestez également avoir pris
                    connaissance des garanties et franchises décrites sur le devis et qu'elles sont conformes aux
                    besoins
                    que vous avez exprimés</p>
                <small class="important">
                    * Les honoraires de courtage sont acquis pour le cabinet dès la proposition d’une solution
                    d'assurance. En
                    cas de rétractation dérogé sur la proposition d'assurance le remboursement se fera uniquement sur le
                    prorata des acomptes versées aux compagnies.
                </small><br>
                <small class="important">* Les frais de courtage annexes sont dus intégralement à la souscription du
                    contrat et à chaque
                    renouvellement de votre contrat. Ils sont perçus sur la base des modalités de paiement que vous avez
                    choisies pour le règlement de la cotisation annuelle. Vous serez informés de leur montant à chaque
                    renouvellement via votre avis d'échéance. En cas de résiliation avant l'échéance annuelle, vous
                    restez redevable de l'intégralité de ces frais.
                </small><br>
                <small class="important">* Très important : les modalités d’application du contrat et des garanties
                    ci-dessus sont détaillées
                    dans les dispositions particulières et générales qui précisent les conditions, montants, limites de
                    garanties ainsi que les exclusions applicables.</small><br>
                <small class="important">
                    * Très important : le Contrat a été souscrit en se basant sur vos déclarations en cas de fausse
                    déclaration le contrat sera resilié pour fausse déclaration ou nullité de contrat.
                </small><br>
                <small class="important">
                    * Il est important de noter que ce document n'est qu'un devis accompagné d'autres documents
                    précontractuels et ne peut en aucun cas garantir que vous êtes assuré, même s'il est signé. Pour que
                    votre couverture d'assurance soit effective, il faut que votre dossier soit accepté par la compagnie
                    d'assurance et que vous receviez votre attestation d'assurance et votre carte verte.
                </small><br>
                <p>Je soussigné avoir pris connaissance du présent document avant la conclusion du contrat.</p>
                <p>Je confirme accepter d’être prélevé et effectuer le règlement de l’acompte et des frais de dossiers
                    par
                    Carte Bancaire.</p>
                <p>Je soussigné (e) <b>${data.souscripteur.nom} ${data.souscripteur.prenom}</b></p>
                <p>Autorise le cabinet CARREZ CONSEIL ASSURANCES à débiter la somme de <b>${data.frais} €</b>
                    Dont frais de dossiers et honoraire de courtage : <b>${data.fraisCourtage} €</b> et acompte à reverser
                    à la
                    compagnie : <b>${data.acompteCompagnie} €</b>
                </p>
                <ul class="list-unstyled d-flex justify-content-around">
                    <li class="mx-2"><b>${data.dateReglement1} €</b> régler le <b>${data.montantAout2024}</b></li>
                    <li class="mx-2"><b>${data.dateReglement2} €</b> à régler en <b>${data.montantAout2024}</b></li>
                    <li class="mx-2"><b>${data.montantAout2024} €</b> à régler avant le <b>${data.dateReglement2}</b></li>
                </ul>
                <div class="row ">
                    <div class="col signature-area ">
                        <p class="text-center">Le : <b>${data.dateToday}</b></p>
                        <p class="text-center">Signature :</p>
                    </div>
                    <div class="col signature-area">
                        <p class="text-center">Le courtier Conseil CARREZ CONSEIL ASSURANCES N° Orias : 17 005 138</p>
                    </div>
                </div>
                <p><b>L’article L 112-2-1 du Code des Assurances prévoit, en cas de vente à distance, une faculté de
                        renoncer
                        au contrat dans un délai de 14 jours à compter de la date de souscription, sans motif ni
                        pénalité.
                        Toutefois, par dérogation, ce droit à renonciation ne s’applique pas aux contrats d’assurance
                        mentionnés
                        à l'article L 211-1 du même code couvrant la responsabilité civile des Véhicules terrestres à
                        moteur. En
                        conséquence, si vous souhaitez souscrire maintenant, vous êtes informé qu'à compter de la prise
                        d'effet
                        de vos garanties, vous ne disposez pas de droit à renonciation.</b> </p>
            </div>
            <footer class="bg-light py-2 ">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <small>CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200
                                USSEL – France</small>
                            <small>Tél : 05 19 79 97 69 email : contact@carrezconseil.fr</small>
                            <small>RCS Brive 830 933 040 – Numéro ORIAS 17005138
                                www.orias.fr</small>
                            <small>Activité des agents et courtiers d’assurances (6622Z)</small>

                        </div>
                    </div>
                </div>
            </footer>
</body>
</html>
        `

      const blob = new Blob([htmlTemplate], { type: 'text/html' })
      const link = document.createElement('a')

      link.href = URL.createObjectURL(blob)
      link.download = 'auto_template.html'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return {
      currentSection,
      souscripteur,
      antecedentsAssurance,
      antecedentsSouscripteur,
      vehicule,
      type_assuranceOptions,
      garanties,
      produitAssurance,
      formule,
      partenaire,
      primeAnnuelle,
      fraisCourtage,
      sommeADebiter,
      fraisDossiers,
      acompteCompagnie,
      dateReglement1,
      montantAout2024,
      dateReglement2,
      dateToday,
      handleSubmit,
    }
  },
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <div v-if="currentSection === 'souscripteur'">
              <VTextField
                v-model="souscripteur.civilite"
                label="Civilité"
              /><br>
              <VTextField
                v-model="souscripteur.nom"
                label="Nom"
              /><br>
              <VTextField
                v-model="souscripteur.prenom"
                label="Prénom"
              /><br>
              <VTextField
                v-model="souscripteur.dateNaissance"
                label="Date de naissance"
              /><br>
              <VTextField
                v-model="souscripteur.profession"
                label="Profession"
              /><br>
              <VTextField
                v-model="souscripteur.telephone"
                label="Numéro de téléphone"
              /><br>
              <VTextField
                v-model="souscripteur.adresseMail"
                label="Adresse mail"
              /><br>
              <VTextField
                v-model="souscripteur.adressePostale"
                label="Adresse postale"
              /><br>
              <VSelect
                v-model="souscripteur.type_assurance"
                :items="type_assuranceOptions"
                label="Nous a consulté pour une assurance"
              /><br>
              <VTextField
                v-model="souscripteur.numDevis"
                label="N°Devis"
              />
            </div>
            <div v-if="currentSection === 'antecedentsAssurance'">
              <VTextField
                v-model="antecedentsAssurance.bonusMalus"
                label="Coefficient Bonus-Malus"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.moisAssurance"
                label="Nombre de mois d’assurances"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.motifResiliation"
                label="Motif de résiliation"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.sinistreMaterielResponsable"
                label="Nombre de sinistres matériels responsables"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.sinistreMaterielNonResponsable"
                label="Nombre de sinistres matériels non responsables"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.sinistreCorporelResponsable"
                label="Nombre de sinistres corporels responsables"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.sinistreCorporelNonResponsable"
                label="Nombre de sinistres corporels non responsables"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.brisDeGlace"
                label="Nombre de sinistres bris de glace"
              /><br>
              <VTextField
                v-model="antecedentsAssurance.vol"
                label="Nombre de sinistres vol"
              />
            </div>
            <div v-if="currentSection === 'antecedentsSouscripteur'">
              <VTextField
                v-model="antecedentsSouscripteur.suspensionAlcoolemie"
                label="Suspension Alcoolémie"
              /><br>
              <VTextField
                v-model="antecedentsSouscripteur.suspensionStupefiants"
                label="Suspension Stupéfiants"
              /><br>
              <VTextField
                v-model="antecedentsSouscripteur.suspensionPoints"
                label="Suspension pour solde de points nul"
              /><br>
              <VTextField
                v-model="antecedentsSouscripteur.annulationPoints"
                label="Annulation pour solde de points nul"
              /><br>
              <VTextField
                v-model="antecedentsSouscripteur.moisSuspension"
                label="Nombre de mois de suspension"
              />
            </div>
            <div v-if="currentSection === 'vehicule'">
              <VTextField
                v-model="vehicule.marque"
                label="Marque"
              /><br>
              <VTextField
                v-model="vehicule.modele"
                label="Modèle"
              /><br>
              <VTextField
                v-model="vehicule.puissanceFiscale"
                label="Puissance Fiscale"
              /><br>
              <VTextField
                v-model="vehicule.premiereMiseEnCirculation"
                label="Première Mise En Circulation"
              /><br>
              <VTextField
                v-model="vehicule.immatriculation"
                label="Immatriculation"
              /><br>
              <VTextField
                v-model="vehicule.usage"
                label="Usage"
              />
            </div>
            <div v-if="currentSection === 'garanties'">
              <VTable>
                <thead>
                  <tr>
                    <th>Garanties</th>
                    <th>Contact</th>
                    <th>Contact+</th>
                    <th>Confort</th>
                    <th>Sérénité</th>
                    <th>Plafond</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(garantie, index) in garanties"
                    :key="index"
                  >
                    <td>{{ garantie.name }}</td>
                    <td><VCheckbox v-model="garantie.contact" /></td>
                    <td><VCheckbox v-model="garantie.contactPlus" /></td>
                    <td><VCheckbox v-model="garantie.confort" /></td>
                    <td><VCheckbox v-model="garantie.serenite" /></td>
                    <td><VTextField v-model="garantie.plafond" /></td>
                  </tr>
                </tbody>
              </VTable>
            </div>
            <div v-if="currentSection === 'informations'">
              <VTextField
                v-model="produitAssurance"
                label="Assurance recommandée"
              /><br>
              <VTextField
                v-model="formule"
                label="Formule"
              /><br>
              <VTextField
                v-model="partenaire"
                label="Partenaire"
              /><br>
              <VTextField
                v-model="primeAnnuelle"
                label="Prime annuelle"
              /><br>
              <VTextField
                v-model="fraisCourtage"
                label="Frais de courtage"
              /><br>
              <VTextField
                v-model="sommeADebiter"
                label="Somme à débiter"
              /><br>
              <VTextField
                v-model="fraisDossiers"
                label="Frais de dossiers et honoraires de courtage"
              /><br>
              <VTextField
                v-model="acompteCompagnie"
                label="Acompte à reverser à la compagnie"
              /><br>
              <VTextField
                v-model="dateReglement1"
                label="Date à régler le"
              /><br>
              <VTextField
                v-model="montantAout2024"
                label="À régler en Août 2024"
              /><br>
              <VTextField
                v-model="dateReglement2"
                label="À régler avant le 02/09/2024"
              /><br>
              <VTextField
                v-model="dateToday"
                label="Date d'aujourd'hui"
              /><br>
              <VBtn
                color="primary"
                large
                block
                class="my-4"
                @click="handleSubmit"
              >
                Submit
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VBottomNavigation v-model="currentSection">
      <VBtn value="souscripteur">
        <VIcon>mdi-account</VIcon>
        <span>Le souscripteur ou le conducteur principal</span>
      </VBtn>
      <VBtn value="antecedentsAssurance">
        <VIcon>mdi-shield</VIcon>
        <span>Les antécédents d’assurance</span>
      </VBtn>
      <VBtn value="antecedentsSouscripteur">
        <VIcon>mdi-history</VIcon>
        <span>Les antécédents du souscripteur</span>
      </VBtn>
      <VBtn value="vehicule">
        <VIcon>mdi-car</VIcon>
        <span>Le véhicule</span>
      </VBtn>
      <VBtn value="garanties">
        <VIcon>mdi-checkbox-marked-circle</VIcon>
        <span>Vos exigences et besoins</span>
      </VBtn>
      <VBtn value="informations">
        <VIcon>mdi-information</VIcon>
        <span>Informations complémentaires</span>
      </VBtn>
    </VBottomNavigation>
  </VContainer>
</template>

  <style scoped>
  .headline {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .v-btn {
    text-transform: none;
  }
  </style>
