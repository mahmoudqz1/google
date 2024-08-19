<script lang="ts" setup>
import html2pdf from 'html2pdf.js'
import { ref } from 'vue'

const data = ref({
  civilite: '',
  nom: '',
  prenom: '',
  dateNaissance: '',
  profession: '',
  telephone: '',
  email: '',
  adresse: '',
  type_assurance: '',
  bonus_malus: '',
  mois_assurances: '',
  motif_resiliation: '',
  sinistre_materiel_responsable: '',
  sinistre_materiel_non_responsable: '',
  sinistre_corporel_responsable: '',
  sinistre_corporel_non_responsable: '',
  bris_glace: '',
  vol: '',
  type_habitation: '',
  dependances: '',
  nature_residence: '',
  superficie: '',
  inhabitation: '',
  qualite_occupant: '',
  code_postal: '',
  commune: '',
  nbr_pieces_principales: '',
  produit: '',
  formule: '',
  partenaire: '',
  prime_annuelle: '',
  frais_courtage: '',
  frais: '',
  acompte: '',
  p1: '',
  p1_date: '',
  pre1: '',
  p2: '',
  p2_date: '',
  pre2: '',
  p3: '',
  p3_date: '',
  pre3: '',
  c11: false,
  c12: false,
  c13: false,
  c14: '',
  c21: false,
  c22: false,
  c23: false,
  c24: '',
  c31: false,
  c32: false,
  c33: false,
  c34: '',
  c41: false,
  c42: false,
  c43: false,
  c44: '',
  c51: false,
  c52: false,
  c53: false,
  c54: '',
  c61: false,
  c62: false,
  c63: false,
  c64: '',
  c71: false,
  c72: false,
  c73: false,
  c74: '',
  c81: false,
  c82: false,
  c83: false,
  c84: '',
  c91: false,
  c92: false,
  c93: false,
  c94: '',
  c101: false,
  c102: false,
  c103: false,
  c104: '',
  c111: false,
  c112: false,
  c113: false,
  c114: '',
  c121: false,
  c122: false,
  c123: false,
  c124: '',
  c131: false,
  c132: false,
  c133: false,
  c134: '',
  c141: false,
  c142: false,
  c143: false,
  c144: '',
})

const type_assuranceOptions = ref(['habitation'])
const currentView = ref('souscripteur')

const generateHTMLTemplate = () => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devoir de conseil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <style>
        /* Screen-specific Styles */
        @media print {
            .no-print {
                display: none;
            }
        }
        @page {
            margin: 0;
        }

        body {
            margin: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            /* Modern and printer-friendly font */
            color: #333;

            line-height: 1.5;
            font-size: 14px;
            /* Reduced font size */
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;

            /* Pure white background for a crisp look */
            border-bottom: 1px solid #d1d1d1;
            /* Subtle border for a polished edge */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            /* Very light shadow for depth */
            font-size: 12px;
            /* Compact font size for contracts */
        }

        .header-logo img {
            height: 100px;
            /* Smaller logo for a clean look */
            width: auto;
        }

        .header-info,
        .header-advisor {
            flex-grow: 1;
            text-align: center;
            padding: 0 10px;
            /* Padding to prevent text from being too close to the edge */
        }

        .header-info small,
        .header-advisor h5 {
            color: #555;
            /* Dark gray for legibility yet soft on the eyes */
            font-weight: normal;
            /* Avoid bold fonts for a lighter feel */
        }

        .header-info small {
            display: block;
            /* Each info piece on a new line for better organization */
            margin-bottom: 2px;
            /* Minimal space between lines */
        }

        .header-advisor h5 {
            font-size: 14px;
            /* Slightly larger for emphasis */
        }


        .container-fluid {
            margin: 0px auto;
            padding-left: 20px;
            padding-right: 20px;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        }

        p,
        small {
            font-size: 14px;
            /* Smaller font size for better readability */
        }

        h1,
        h2,
        h3,
        h4 {
            margin-top: 20px;
            margin-bottom: 10px;
            color: #333;
        }

        ul,
        ol {
            padding-left: 20px;
        }

        table.table-bordered {
            width: 100%;
            margin-top: 15px;
            border-collapse: collapse;
            /* Ensure borders are neat */
            font-size: 12px;
            /* Smaller font size for compact look */

            /* Light grey background for readability */
            color: #333;
            /* Dark text for contrast */
        }

        th,
        td {
            border: 1px solid #ccc;
            /* Consistent with existing style */
            padding: 5px;
            /* Reduced padding for a compact look */
            text-align: center;
            /* Centered text for a cleaner presentation */
            vertical-align: middle;
            /* Align content in the middle of the cell */
        }

        thead th {

            /* Light grey background for header */
            color: #333;
            /* Dark text for readability */
            font-weight: bold;
            /* Bold font for headers */
        }

        table tr {
            height: auto;
            /* Allow row height to adjust to content */
            line-height: 0.5;
            /* Improved line height for better readability */
        }

        .section {

            text-align: center;
            /* Ensure the text is centered */
            padding: 10px;
            /* Sufficient padding for visual comfort */
        }

        .section h5 {
            color: #333;
            /* Dark grey for excellent readability */
            font-size: 16px;
            /* Appropriate size for headings */
            margin: 0px 0;
            /* Adequate spacing around the heading */
        }

        .section-courier {

            /* White background for a more formal look */
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 0px;
            border: 1px solid #e0e0e0;
            /* Lighter border for subtlety */
            border-radius: 4px;
            /* Less pronounced rounded corners */
            margin-bottom: 5px;
            /* Consistent bottom margin for spacing */
            box-sizing: border-box;
            /* Include padding and border in the element's total dimensions */
            text-align: justify;
            /* Left-align text for better readability */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            /* Soft shadow for a slight depth */
            padding-bottom: 0px;
        }

        .section-title {
            font-size: 15px;
            /* Slightly smaller font size for a cleaner look */
            color: #007bff;
            /* Modern blue for visual emphasis */
            margin-bottom: 5px;
            /* Adequate spacing after the title */
            font-weight: 600;
            margin-top: 5px;
            /* Semi-bold for clarity */
        }

        .section-courier p,
        .section-courier small {
            font-size: 12px;
            /* Uniform font size for better flow */
            color: #555;
            /* Darker grey for readability */
            line-height: 1.5;
            /* Increased line spacing for enhanced legibility */
            margin-bottom: 10px;
            /* Consistent spacing for a tidy layout */
        }

        .section-courier small {
            font-size: 10px;
            /* Small but readable font size */
            color: #555;
            /* Lighter grey for secondary information */
            margin-bottom: 5px;
        }

        .section-courier strong {
            color: #000;
            /* Maintain black for emphasis */
            font-weight: bold;
            /* Bold to highlight important text */
        }

        .new-section {
            page-break-before: always;
        }

        .avoid-break {
            page-break-inside: avoid;
        }

        .end-section {
            page-break-after: always;
        }

        .contract-details {
            padding-left: 15px;
            padding-right: 15px;
            border: 1px solid #e0e0e0;
            /* Lighter border for subtlety */
            border-radius: 4px;
            /* Less pronounced rounded corners */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            /* Soft shadow for a slight depth */

            /* White background for a more formal look */
            margin-bottom: 5px;
            /* Consistent bottom margin for spacing */
            font-size: 10px;
            /* Smaller font size for better readability */
            color: #555;
            /* Darker grey for readability */
        }

        .contract-details h5 {
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
            margin-top: 5px;
            font-weight: 600;
            /* Semi-bold for clarity */
        }

        .contract-details p span {
            font-weight: bold;
            /* Bold for data */
        }

        .centered-title {
            text-align: center;
            /* Center align the title */
            border: 1px solid #ccc;
            /* Grey border for visibility */
            padding: 5px;
            /* Padding around the text */
            margin-top: 5px;
            /* Space above the title */
            margin-bottom: 5px;
            /* Space below the title */

            /* White background for the title block */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            /* Subtle shadow for depth */
        }

        .centered-title h5 {
            margin: 0;
            /* Remove default margin */
            color: #333;
            /* Consistent text color */
            font-weight: 600;
            /* Semi-bold for emphasis */
        }

        .section-courier.contract-details p {
            width: 100%;
            /* Ensures full width for alignment */
            line-height: 1;
            /* Improves readability */
        }

        /* General Styles for the Contract Content */
        .contract-content {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;

            line-height: 1.25;
            font-size: 14px;

            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 0px;
            padding-top: 0px;
            /* Padding for better spacing from the container edges */
        }

        .contract-content p,
        .contract-content ul,
        .contract-content small {
            margin-bottom: 10px;
            /* Consistent spacing between paragraphs */
        }

        .contract-content h5 {
            color: #007bff;
            /* Highlighting headings with a corporate blue */
            font-size: 16px;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .contract-content small {
            font-size: 10px;
            /* Smaller font size for less crucial information */
            color: #555;
            /* Slightly lighter text for less emphasis */
            text-align: justify;
        }

        .contract-content ul {
            list-style-type: disc;
            /* Adds bullets to the list for clarity */
            padding-left: 50px;
            /* Proper indentation for list items */
        }

        .contract-content li {
            margin-bottom: 0px;
            /* Spacing between list items */
            font-size: 11px;
        }

        .contract-content p {
            font-size: 11px;
            text-align: justify;
        }


        /* Specific Styles for Contract Terms and Signatures */
        .contract-content .row {
            margin-top: 20px;
            /* Adds space before the row for clear separation */
        }

        .contract-content .col {
            padding: 10px;
            /* Internal padding for alignment and spacing */
        }

        /* Enhancing readability for very important notes */
        .contract-content small.important {
            font-weight: bold;
            /* Making important notes bold */
            color: #000;
            /* Darker color for importance */
            text-align: justify;
        }

        /* Styling for the signature area */
        .signature-area {
            font-style: italic;
            /* Styling for signature prompts */
        }
    </style>
</head>
<body>
    <div class="no-print">
        <button class="btn btn-success" onclick="window.print()" style="display: inline-block; margin-right: 10px;">Sauvegarder</button>
        <p style="display: inline-block; margin: 0;"><a href="{{ url_for('static', filename=data.file_path[7:]) }}">Devis</a></p>
    </div>
    <div class="container-fluid">
        <header class="row header">
            <div class="col-2 header-logo">
                <a href="{{ url_for('home') }}"><img src="https://carrezconseil.fr/wp-content/uploads/2024/04/carrez-logo.png" alt="Logo de la société" class="img-fluid"></a>
            </div>
            <div class="col-8 header-info">
                <small style="font-size: 11px;">CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200 USSEL
                    –France</small>
                <small style="font-size: 11px;">Tél : 05 19 79 97 69 email : contact@carrezconseil.fr</small>
                <small style="font-size: 11px;">RCS Brive 830 933 040 – Numéro ORIAS 17005138 – WWW orias.fr</small>
                <small style="font-size: 11px;">Activité des agents et courtiers d’assurances (6622Z)</small>
            </div>
            <div class="col-2 header-advisor">
                <h5>Votre Conseiller : <b>{{user.name}}</b></h5>
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
                    CONSEIL ASSURANCES est situé au 3 rue du pré d’Aubiat 19200 USSEL La catégorie juridique de la
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
                        <small style="font-size: 10px;">CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200 USSEL
                            –France</small>
                        <small style="font-size: 10px;">Tél : 05 19 79 97 69 email : contact@carrezconseil.fr </small>
                        <small style="font-size: 10px;">RCS Brive 830 933 040 – Numéro ORIAS 17005138
                            www.orias.fr</small>
                        <small style="font-size: 10px;">Activité des agents et courtiers d’assurances (6622Z)</small>

                    </div>
                </div>
            </div>
        </footer>
        <div class="end-section"></div>
        <header class="bg-light py-2 text-center">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <!-- Image and Company Name Properly Aligned -->
                        <div class="d-inline-block align-middle">
                            <img src="https://carrezconseil.fr/wp-content/uploads/2024/04/carrez-logo.png" alt="Logo de la société" class="img-fluid"
                                style="height: 30px;">
                        </div>
                        <div class="d-inline-block align-middle">
                            <small class="mb-0">Carrez Conseil Assurances</small>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="row justify-content-center">
            <div class="col-6 section-courier contract-details align-items-center ">
                <div class="centered-title">
                    <h5>Le souscripteur</h5>
                </div>
                <p>Civilité : <span>${data.value.civilite}</span></p>
                <p>Nom Prénom : <span>${data.value.nom} ${data.value.prenom}</span></p>
                <p>Date de naissance : <span>${data.value.dateNaissance}</span></p>
                <p>Profession : <span>${data.value.profession}</span></p>
                <p>Numéro de téléphone : <span>${data.value.telephone}</span></p>
                <p>Adresse mail : <span>${data.value.email}</span></p>
                <p>Adresse postale : <span>${data.value.adresse}</span></p>
                <p class="text-center">Nous a consulté pour une assurance, <span>${data.value.type_assurance}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Les antécédents d’assurance</h5>
                </div>
                <p>Coefficient Bonus-Malus : <span>${data.value.bonus_malus}</span></p>
                <p>Nombre de mois d’assurances : <span>${data.value.mois_assurances}</span></p>
                <p>Motif de résiliation : <span>${data.value.motif_resiliation}</span></p>
                <p>Nombre de sinistre matériel responsable : <span>${data.value.sinistre_materiel_responsable}</span></p>
                <p>Nombre de sinistre matériel non responsable : <span>${data.value.sinistre_materiel_non_responsable}</span></p>
                <p>Nombre de sinistre corporel responsable : <span>${data.value.sinistre_corporel_responsable}</span></p>
                <p>Nombre de sinistre corporel non responsable : <span>${data.value.sinistre_corporel_non_responsable}</span></p>
                <p>Nombre de bris de glace : <span>${data.value.bris_glace}</span></p>
                <p>Nombre de vol : <span>${data.value.vol}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Habitation</h5>
                </div>
                <p>Type : <span>${data.value.type_habitation}</span></p>
                <p>Dépendances : <span>${data.value.dependances}</span></p>
                <p>Nature de la résidence : <span>${data.value.nature_residence}</span></p>
                <p>Superficie : <span>${data.value.superficie} m²</span></p>
                <p>Inhabitation : <span>${data.value.inhabitation}</span></p>
                <p>Qualité de l'occupant : <span>${data.value.qualite_occupant}</span></p>
                <p>Code postal : <span>${data.value.code_postal}</span></p>
                <p>Commune : <span>${data.value.commune}</span></p>
                <p>Nombre de pièces principales : <span>${data.value.nbr_pieces_principales}</span></p>
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
                                    <th>CONTACT
                                    </th>
                                    <th>CONFORT
                                    </th>
                                    <th>SERENITE
                                    </th>
                                    <th>FRANCHISES / PLAFOND</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Responsabilité civile</td>
                                    <td class="checkbox ${data.value.c11 ? 'checked' : ''}">${data.value.c11 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c12 ? 'checked' : ''}">${data.value.c12 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c13 ? 'checked' : ''}">${data.value.c13 ? '✔' : ''}</td>
                                    <td>${data.value.c14}</td>
                                </tr>
                                <tr>
                                    <td>Défense pénale et Recours</td>
                                    <td class="checkbox ${data.value.c21 ? 'checked' : ''}">${data.value.c21 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c22 ? 'checked' : ''}">${data.value.c22 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c23 ? 'checked' : ''}">${data.value.c23 ? '✔' : ''}</td>
                                    <td>${data.value.c24}</td>
                                </tr>
                                <tr>
                                    <td>Incendie et évènements assimilés</td>
                                    <td class="checkbox ${data.value.c31 ? 'checked' : ''}">${data.value.c31 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c32 ? 'checked' : ''}">${data.value.c32 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c33 ? 'checked' : ''}">${data.value.c33 ? '✔' : ''}</td>
                                    <td>${data.value.c34}</td>
                                </tr>
                                <tr>
                                    <td>Catastrophes naturelles</td>
                                    <td class="checkbox ${data.value.c41 ? 'checked' : ''}">${data.value.c41 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c42 ? 'checked' : ''}">${data.value.c42 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c43 ? 'checked' : ''}">${data.value.c43 ? '✔' : ''}</td>
                                    <td>${data.value.c44}</td>
                                </tr>
                                <tr>
                                    <td>Catastrophes technologiques</td>
                                    <td class="checkbox ${data.value.c51 ? 'checked' : ''}">${data.value.c51 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c52 ? 'checked' : ''}">${data.value.c52 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c53 ? 'checked' : ''}">${data.value.c53 ? '✔' : ''}</td>
                                    <td>${data.value.c54}</td>
                                </tr>
                                <tr>
                                    <td>Attentats, actes de terrorisme</td>
                                    <td class="checkbox ${data.value.c61 ? 'checked' : ''}">${data.value.c61 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c62 ? 'checked' : ''}">${data.value.c62 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c63 ? 'checked' : ''}">${data.value.c63 ? '✔' : ''}</td>
                                    <td>${data.value.c64}</td>
                                </tr>
                                <tr>
                                    <td>Dégât des eaux</td>
                                    <td class="checkbox ${data.value.c71 ? 'checked' : ''}">${data.value.c71 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c72 ? 'checked' : ''}">${data.value.c72 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c73 ? 'checked' : ''}">${data.value.c73 ? '✔' : ''}</td>
                                    <td>${data.value.c74}</td>
                                </tr>
                                <tr>
                                    <td>Bris des glaces</td>
                                    <td class="checkbox ${data.value.c81 ? 'checked' : ''}">${data.value.c81 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c82 ? 'checked' : ''}">${data.value.c82 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c83 ? 'checked' : ''}">${data.value.c83 ? '✔' : ''}</td>
                                    <td>${data.value.c84}</td>
                                </tr>
                                <tr>
                                    <td>Protection juridique</td>
                                    <td class="checkbox ${data.value.c91 ? 'checked' : ''}">${data.value.c91 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c92 ? 'checked' : ''}">${data.value.c92 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c93 ? 'checked' : ''}">${data.value.c93 ? '✔' : ''}</td>
                                    <td>${data.value.c94}</td>
                                </tr>
                                <tr>
                                    <td>Responsabilité Civile</td>
                                    <td class="checkbox ${data.value.c101 ? 'checked' : ''}">${data.value.c101 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c102 ? 'checked' : ''}">${data.value.c102 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c103 ? 'checked' : ''}">${data.value.c103 ? '✔' : ''}</td>
                                    <td>${data.value.c104}</td>
                                </tr>
                                <tr>
                                    <td>Tempête, Grêle, Neige</td>
                                    <td class="checkbox ${data.value.c111 ? 'checked' : ''}">${data.value.c111 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c112 ? 'checked' : ''}">${data.value.c112 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c113 ? 'checked' : ''}">${data.value.c113 ? '✔' : ''}</td>
                                    <td>${data.value.c114}</td>
                                </tr>
                                <tr>
                                    <td>Vol</td>
                                    <td class="checkbox ${data.value.c121 ? 'checked' : ''}">${data.value.c121 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c122 ? 'checked' : ''}">${data.value.c122 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c123 ? 'checked' : ''}">${data.value.c123 ? '✔' : ''}</td>
                                    <td>${data.value.c124}</td>
                                </tr>
                                <tr>
                                    <td>Dommages électriques</td>
                                    <td class="checkbox ${data.value.c131 ? 'checked' : ''}">${data.value.c131 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c132 ? 'checked' : ''}">${data.value.c132 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c133 ? 'checked' : ''}">${data.value.c133 ? '✔' : ''}</td>
                                    <td>${data.value.c134}</td>
                                </tr>
                                <tr>
                                    <td>Assurance scolaire</td>
                                    <td class="checkbox ${data.value.c141 ? 'checked' : ''}">${data.value.c141 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c142 ? 'checked' : ''}">${data.value.c142 ? '✔' : ''}</td>
                                    <td class="checkbox ${data.value.c143 ? 'checked' : ''}">${data.value.c143 ? '✔' : ''}</td>
                                    <td>${data.value.c144}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style="line-height: 0.5; font-size: 12px;">Selon les informations de votre habitation et vos besoins, nous vous
                            conseillons le produit
                            Assurance
                            <b>${data.value.produit}</b>
                        </p>
                        <p style="line-height: 0.5; font-size: 12px;">Pour la formule <b>${data.value.formule}</b> Auprès de notre partenaire
                            <b>${data.value.partenaire}</b>.
                        </p>
                    </div>
                </div>

            </div>
            <footer class="bg-light py-2 text-center">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <small style="font-size: 10px;">CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200
                                USSEL –France</small>
                            <small style="font-size: 10px;">Tél : 05 19 79 97 69 email : contact@carrezconseil.fr
                            </small>
                            <small style="font-size: 10px;">RCS Brive 830 933 040 – Numéro ORIAS 17005138
                                www.orias.fr</small>
                            <small style="font-size: 10px;">Activité des agents et courtiers d’assurances
                                (6622Z)</small>

                        </div>
                    </div>
                </div>
            </footer>

            <div class="end-section"></div>

            <header class="bg-light py-2 text-center">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <!-- Image and Company Name Properly Aligned -->
                            <div class="d-inline-block align-middle">
                                <img src="https://carrezconseil.fr/wp-content/uploads/2024/04/carrez-logo.png" alt="Logo de la société"
                                    class="img-fluid" style="height: 30px;">
                            </div>
                            <div class="d-inline-block align-middle">
                                <small class="mb-0">Carrez Conseil Assurances</small>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="contract-content">
                <small style="text-align: justify; margin-top: 1px;">L’article L 112-2-1 du Code des Assurances prévoit,
                    en cas de vente
                    à distance, une faculté de
                    renoncer au contrat dans un délai de 14 jours à compter de la date de souscription, sans motif ni
                    pénalité. Toutefois, par dérogation, ce droit à renonciation ne s’applique pas aux contrats
                    d’assurance
                    mentionnés à l'article L 211-1 du même code couvrant la responsabilité civile des Véhicules
                    terrestres à
                    moteur. En conséquence, si vous souhaitez souscrire maintenant, vous êtes informé qu'à compter de la
                    prise d'effet de vos garanties, vous ne disposez pas de droit à renonciation.</small>
                <p>La prime annuelle s'élève à <b>${data.value.prime_annuelle} €</b> et ( <b>${data.value.mois} €</b> mois) taxes incluses,
                    Frais de courtage :
                    <b>${data.value.frais_courtage} €</b>.
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
                <p>Je soussigné (e) <b>${data.value.nom} ${data.value.prenom}</b></p>
                <p>Autorise le cabinet CARREZ CONSEIL ASSURANCES à débiter la somme de <b>${data.value.frais} €</b>
                    Dont frais de dossiers et honoraire de courtage : <b>${data.value.frais_courtage} €</b> et acompte à reverser
                    à la
                    compagnie : <b>${data.value.acompte} €</b>
                </p>
                <ul class="list-unstyled d-flex justify-content-around">
                    <li class="mx-2"><b>{{data.p1}} €</b> régler le <b>{{data.p1_date}} {{data.pre1}}</b></li>
                    <li class="mx-2"><b>{{data.p2}} €</b> à régler en <b>{{data.p2_date}} {{data.pre2}}</b></li>
                    <li class="mx-2"><b>{{data.p3}} €</b> à régler avant le <b>{{data.p3_date}} {{data.pre3}}</b></li>
                </ul>
                <div class="row ">
                    <div class="col signature-area ">
                        <p class="text-center">Le : {{data.date_signature}}</p>
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
                            <small style="font-size: 10px;">CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200
                                USSEL –France</small>
                            <small style="font-size: 10px;">Tél : 05 19 79 97 69 email : contact@carrezconseil.fr
                            </small>
                            <small style="font-size: 10px;">RCS Brive 830 933 040 – Numéro ORIAS 17005138
                                www.orias.fr</small>
                            <small style="font-size: 10px;">Activité des agents et courtiers d’assurances
                                (6622Z)</small>

                        </div>
                    </div>
                </div>
            </footer>

            <div class="end-section"></div>

            <header class="bg-light py-2 text-center">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <!-- Image and Company Name Properly Aligned -->
                            <div class="d-inline-block align-middle">
                                <img src="https://carrezconseil.fr/wp-content/uploads/2024/04/carrez-logo.png" alt="Logo de la société"
                                    class="img-fluid" style="height: 30px;">
                            </div>
                            <div class="d-inline-block align-middle">
                                <small class="mb-0">Carrez Conseil Assurances</small>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <style>
                .reduced-space {
                    margin-top: 5px;
                    margin-bottom: 5px;
                }
            </style>
            <div class="row mt-4" style="margin-bottom: 200px;">
                <div class="col mt-4">
                    <p class="reduced-space">${data.value.nom} ${data.value.prenom}</p>
                    <p class="reduced-space">${data.value.adresse}</p>
                    <p class="reduced-space">${data.value.telephone}</p>
                </div>
                <div class="col mt-4" style="text-align: right;">
                    <p class="reduced-space">CARREZ Conseil Assurances</p>
                    <p class="reduced-space">3 rue du Pré d'Aubiat</p>
                    <p class="reduced-space">19200 USSEL</p>
                    <p class="reduced-space">N° ORIAS : 17005138</p>
                </div>
            </div>

            </div>
            <h6><b>Objet</b> : MANDAT DE COURTAGE </h6>
            <p style="text-align: justify;">Madame, Monsieur,</p>
            <p style="text-align: justify;">Je soussigné <b>${data.value.nom} ${data.value.prenom}</b>, demeurant à ${data.value.adresse}, donne mandat à la société CARREZ CONSEIL ASSURANCES, pour agir en mon nom et pour mon compte pour l’étude et le placement de solution d’assurance.</p>
            <p style="text-align: justify;">
                Le bulletin d’adhésion, les notices d’informations et tableaux de garanties souscrites m’ont été transmises parallèlement au présent mandat.
            </p>
            <p style="text-align: justify;">
                Le présent mandat est d’une durée d’un an avec tacite reconduction, il peut être résilié par lettre recommandée avec accusé de réception à l’issue de la première année à tout moment par l’une ou l’autre des parties moyennant un délai de préavis de 1 mois.</p>

                <div class="row" style="margin-bottom: 200px; margin-top: 200px;">
                    <div class="col mt-4">
                        <p class="reduced-space">Signature du souscripteur </p>
                        <p class="reduced-space">(précédée de la mention "Bon pour mandat")</p>
                    </div>
                    <div class="col mt-4" style="text-align: right;">
                        <p class="reduced-space">L’intermédiaire</p>
                        <p class="reduced-space">CARREZ CONSEIL</p>
                        <p class="reduced-space">N° ORIAS 17005138</p>
                    </div>
                </div>
            </div>
        
        <footer class="bg-light py-2 ">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <small style="font-size: 10px;">CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200
                            USSEL –France</small>
                        <small style="font-size: 10px;">Tél : 05 19 79 97 69 email : contact@carrezconseil.fr
                        </small>
                        <small style="font-size: 10px;">RCS Brive 830 933 040 – Numéro ORIAS 17005138
                            www.orias.fr</small>
                        <small style="font-size: 10px;">Activité des agents et courtiers d’assurances
                            (6622Z)</small>

                    </div>
                </div>
            </div>
        </footer>
</body>
</html>
  `
}

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const handleSubmit = () => {
  const htmlTemplate = generateHTMLTemplate()
  const element = document.createElement('div')

  element.innerHTML = htmlTemplate
  html2pdf().from(element).set({
    margin: 1,
    filename: 'habitation_template.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait' },
  }).save()
}

const rows = [
  { garantie: 'Responsabilité civile' },
  { garantie: 'Défense pénale et Recours' },
  { garantie: 'Incendie et évènements assimilés' },
  { garantie: 'Catastrophes naturelles' },
  { garantie: 'Catastrophes technologiques' },
  { garantie: 'Attentats, actes de terrorisme' },
  { garantie: 'Dégât des eaux' },
  { garantie: 'Bris des glaces' },
  { garantie: 'Protection juridique' },
  { garantie: 'Responsabilité Civile' },
  { garantie: 'Tempête, Grêle, Neige' },
  { garantie: 'Vol' },
  { garantie: 'Dommages électriques' },
  { garantie: 'Assurance scolaire' },
]
</script>

<template>
  <VContainer>
    <VRow>
      <!-- Le souscripteur Section -->
      <VCol
        v-if="currentView === 'souscripteur'"
        cols="12"
      >
        <VCard>
          <VCardTitle class="headline grey lighten-2">
            Le souscripteur
          </VCardTitle>
          <VCardText>
            <VTextField
              v-model="data.civilite"
              label="Civilité"
            /><br>
            <VTextField
              v-model="data.nom"
              label="Nom"
            /><br>
            <VTextField
              v-model="data.prenom"
              label="Prénom"
            /><br>
            <VTextField
              v-model="data.dateNaissance"
              label="Date de naissance"
            /><br>
            <VTextField
              v-model="data.profession"
              label="Profession"
            /><br>
            <VTextField
              v-model="data.telephone"
              label="Numéro de téléphone"
            /><br>
            <VTextField
              v-model="data.email"
              label="Adresse mail"
            /><br>
            <VTextField
              v-model="data.adresse"
              label="Adresse postale"
            /><br>
            <VSelect
              v-model="data.type_assurance"
              :items="type_assuranceOptions"
              label="Nous a consulté pour une assurance"
            />
          </VCardText>
        </VCard>
      </VCol>

      <!-- Les antécédents d’assurance Section -->
      <VCol
        v-if="currentView === 'antecedents'"
        cols="12"
      >
        <VCard>
          <VCardTitle class="headline grey lighten-2">
            Les antécédents d’assurance
          </VCardTitle>
          <VCardText>
            <VTextField
              v-model="data.bonus_malus"
              label="Coefficient Bonus-Malus"
            /><br>
            <VTextField
              v-model="data.mois_assurances"
              label="Nombre de mois d’assurances"
            /><br>
            <VTextField
              v-model="data.motif_resiliation"
              label="Motif de résiliation"
            /><br>
            <VTextField
              v-model="data.sinistre_materiel_responsable"
              label="Nombre de sinistres matériels responsables"
            /><br>
            <VTextField
              v-model="data.sinistre_materiel_non_responsable"
              label="Nombre de sinistres matériels non responsables"
            /><br>
            <VTextField
              v-model="data.sinistre_corporel_responsable"
              label="Nombre de sinistres corporels responsables"
            /><br>
            <VTextField
              v-model="data.sinistre_corporel_non_responsable"
              label="Nombre de sinistres corporels non responsables"
            /><br>
            <VTextField
              v-model="data.bris_glace"
              label="Nombre de bris de glace"
            /><br>
            <VTextField
              v-model="data.vol"
              label="Nombre de vols"
            />
          </VCardText>
        </VCard>
      </VCol>

      <!-- Habitation Section -->
      <VCol
        v-if="currentView === 'habitation'"
        cols="12"
      >
        <VCard>
          <VCardTitle class="headline grey lighten-2">
            Habitation
          </VCardTitle>
          <VCardText>
            <VTextField
              v-model="data.type_habitation"
              label="Type"
            /><br>
            <VTextField
              v-model="data.dependances"
              label="Dépendances"
            /><br>
            <VTextField
              v-model="data.nature_residence"
              label="Nature de la résidence"
            /><br>
            <VTextField
              v-model="data.superficie"
              label="Superficie (m²)"
            /><br>
            <VTextField
              v-model="data.inhabitation"
              label="Inhabitation"
            /><br>
            <VTextField
              v-model="data.qualite_occupant"
              label="Qualité de l'occupant"
            /><br>
            <VTextField
              v-model="data.code_postal"
              label="Code postal"
            /><br>
            <VTextField
              v-model="data.commune"
              label="Commune"
            /><br>
            <VTextField
              v-model="data.nbr_pieces_principales"
              label="Nombre de pièces principales"
            />
          </VCardText>
        </VCard>
      </VCol>

      <!-- Vos exigences et besoins Section -->
      <VCol
        v-if="currentView === 'exigences'"
        cols="12"
      >
        <VCard>
          <VCardTitle class="headline grey lighten-2">
            Vos exigences et besoins
          </VCardTitle>
          <VCardText>
            <VTable dense>
              <thead>
                <tr>
                  <th>GARANTIES</th>
                  <th>CONTACT</th>
                  <th>CONFORT</th>
                  <th>SERENITE</th>
                  <th>FRANCHISES / PLAFOND</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in rows"
                  :key="index"
                >
                  <td>{{ row.garantie }}</td>
                  <td>
                    <VCheckbox v-model="data[`c${index + 1}1`]" />
                  </td>
                  <td>
                    <VCheckbox v-model="data[`c${index + 1}2`]" />
                  </td>
                  <td>
                    <VCheckbox v-model="data[`c${index + 1}3`]" />
                  </td>
                  <td>
                    <VTextField
                      v-model="data[`c${index + 1}4`]"
                      hide-details
                      dense
                    />
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Informations complémentaires Section -->
      <VCol
        v-if="currentView === 'informations'"
        cols="12"
      >
        <VCard>
          <VCardTitle class="headline grey lighten-2">
            Informations complémentaires
          </VCardTitle>
          <VCardText>
            <VTextField
              v-model="data.produit"
              label="Assurance recommandée"
            /><br>
            <VTextField
              v-model="data.formule"
              label="Formule"
            /><br>
            <VTextField
              v-model="data.partenaire"
              label="Partenaire"
            /><br>
            <VTextField
              v-model="data.prime_annuelle"
              label="Prime annuelle (€)"
            /><br>
            <VTextField
              v-model="data.frais_courtage"
              label="Frais de courtage (€)"
            /><br>
            <VTextField
              v-model="data.frais"
              label="Somme à débiter (€)"
            /><br>
            <VTextField
              v-model="data.acompte"
              label="Acompte à reverser à la compagnie (€)"
            /><br>
            <VTextField
              v-model="data.p1"
              label="Montant à régler (1)"
            /><br>
            <VTextField
              v-model="data.p1_date"
              label="Date à régler (1)"
            /><br>
            <VTextField
              v-model="data.pre1"
              label="Précisions (1)"
            /><br>
            <VTextField
              v-model="data.p2"
              label="Montant à régler (2)"
            /><br>
            <VTextField
              v-model="data.p2_date"
              label="Date à régler (2)"
            /><br>
            <VTextField
              v-model="data.pre2"
              label="Précisions (2)"
            /><br>
            <VTextField
              v-model="data.p3"
              label="Montant à régler (3)"
            /><br>
            <VTextField
              v-model="data.p3_date"
              label="Date à régler (3)"
            /><br>
            <VTextField
              v-model="data.pre3"
              label="Précisions (3)"
            />
          </VCardText>
        </VCard>
        <VBtn
          color="primary"
          large
          block
          class="my-4"
          @click="handleSubmit"
        >
          Submit
        </VBtn>
      </VCol>
    </VRow>

    <!-- Bottom Navigation -->
    <VBottomNavigation v-model="currentView">
      <VBtn value="souscripteur">
        <VIcon>mdi-account</VIcon>
        <span>Le souscripteur</span>
      </VBtn>
      <VBtn value="antecedents">
        <VIcon>mdi-history</VIcon>
        <span>Les antécédents</span>
      </VBtn>
      <VBtn value="habitation">
        <VIcon>mdi-home</VIcon>
        <span>Habitation</span>
      </VBtn>
      <VBtn value="exigences">
        <VIcon>mdi-format-list-bulleted</VIcon>
        <span>Vos exigences et besoins</span>
      </VBtn>
      <VBtn value="informations">
        <VIcon>mdi-information</VIcon>
        <span>Informations</span>
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
.table {
  width: 100%;
}
</style>
