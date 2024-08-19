<script>
export default {
  data() {
    return {
      data: {
        souscripteur: {
          civilite: '',
          nom: '',
          prenom: '',
          dateNaissance: '',
          profession: '',
          telephone: '',
          adresseMail: '',
          adressePostale: '',
          type_assurance: '',
        },
        antecedentsAssurance: {
          bonusMalus: '',
          moisAssurance: '',
          motifResiliation: '',
          sinistreMaterielResponsable: '',
          sinistreMaterielNonResponsable: '',
          sinistreCorporelResponsable: '',
          sinistreCorporelNonResponsable: '',
          brisDeGlace: '',
          vol: '',
        },
        antecedentsSouscripteur: {
          suspensionAlcoolemie: '',
          suspensionStupefiants: '',
          suspensionPoints: '',
          annulationPoints: '',
          moisSuspension: '',
        },
        vehicule: {
          marque: '',
          modele: '',
          puissanceFiscale: '',
          premiereMiseEnCirculation: '',
          immatriculation: '',
          usage: '',
        },
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
        c151: false,
        c152: false,
        c153: false,
        c154: '',
        c161: false,
        c162: false,
        c163: false,
        c164: '',
        c171: false,
        c172: false,
        c173: false,
        c174: '',
        c181: false,
        c182: false,
        c183: false,
        c184: '',
        c191: false,
        c192: false,
        c193: false,
        c194: '',
        c201: false,
        c202: false,
        c203: false,
        c204: '',
        c211: false,
        c212: false,
        c213: false,
        c214: '',
        produit: '',
        formule: '',
        partenaire: '',
        prime_annuelle: '',
        mois: '',
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
      },
      guarantees: [
        { name: 'Responsabilité civile', contact: 'c11', confort: 'c12', serenite: 'c13', plafond: 'c14' },
        { name: 'Défense pénale et Recours', contact: 'c21', confort: 'c22', serenite: 'c23', plafond: 'c24' },
        { name: 'Protection juridique', contact: 'c31', confort: 'c32', serenite: 'c33', plafond: 'c34' },
        { name: 'Garantie conducteur', contact: 'c41', confort: 'c42', serenite: 'c43', plafond: 'c44' },
        { name: 'Assistance', contact: 'c51', confort: 'c52', serenite: 'c53', plafond: 'c54' },
        { name: 'Bris de Glace', contact: 'c61', confort: 'c62', serenite: 'c63', plafond: 'c64' },
        { name: 'Vol-Incendie', contact: 'c71', confort: 'c72', serenite: 'c73', plafond: 'c74' },
        { name: 'Catastrophes naturelles', contact: 'c81', confort: 'c82', serenite: 'c83', plafond: 'c84' },
        { name: 'Catastrophes technologiques', contact: 'c91', confort: 'c92', serenite: 'c93', plafond: 'c94' },
        { name: 'Attentats', contact: 'c101', confort: 'c102', serenite: 'c103', plafond: 'c104' },
        { name: 'Dommages tous accidents', contact: 'c111', confort: 'c112', serenite: 'c113', plafond: 'c114' },
        { name: 'Véhicule de remplacement', contact: 'c121', confort: 'c122', serenite: 'c123', plafond: 'c124' },
        { name: 'Remboursement de franchise', contact: 'c131', confort: 'c132', serenite: 'c133', plafond: 'c134' },
        { name: 'Panne mécanique', contact: 'c141', confort: 'c142', serenite: 'c143', plafond: 'c144' },
        { name: 'Contenu du véhicule', contact: 'c151', confort: 'c152', serenite: 'c153', plafond: 'c154' },
        { name: 'Indemnisation plus', contact: 'c161', confort: 'c162', serenite: 'c163', plafond: 'c164' },
        { name: 'Garantie Gilet Airbag', contact: 'c171', confort: 'c172', serenite: 'c173', plafond: 'c174' },
        { name: 'Garantie Casque', contact: 'c181', confort: 'c182', serenite: 'c183', plafond: 'c184' },
        { name: 'Vol, Incendie, Explosion, Forces de la nature', contact: 'c191', confort: 'c192', serenite: 'c193', plafond: 'c194' },
        { name: 'Equipement (option)', contact: 'c201', confort: 'c202', serenite: 'c203', plafond: 'c204' },
        { name: 'Responsabilité civile professionnelle', contact: 'c211', confort: 'c212', serenite: 'c213', plafond: 'c214' },
      ],
    }
  },
  methods: {
    generateHTML() {
      const htmlTemplate = `
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

        @media print {
            .no-print {
                display: none;
            }
        }
    </style>
</head>

<body>
    <div class="no-print">
        <button class="btn btn-success" onclick="console.log('Print button clicked'); window.print()" style="display: inline-block; margin-right: 10px;">Sauvegarder</button>
        <p style="display: inline-block; margin: 0;"><a href="{{ url_for('static', filename=data.file_path[7:]) }}">Devis</a></p>
    </div>
    <div class="container-fluid">
        <header class="row header">
            <div class="col-2 header-logo">
                <a href="{{ url_for('home') }}"><img src="{{ url_for('static', filename='logo.png') }}" alt="Logo de la société" class="img-fluid"></a>
            </div>
            <div class="col-8 header-info">
                <small style="font-size: 11px;">CARREZ CONSEIL ASSURANCES – 3 rue du Pré d’Aubiat 19200 USSEL
                    –France</small>
                <small style="font-size: 11px;">Tél : 05 19 79 97 69 email : contact@carrezconseil.fr</small>
                <small style="font-size: 11px;">RCS Brive 830 933 040 – Numéro ORIAS 17005138 – WWW orias.fr</small>
                <small style="font-size: 11px;">Activité des agents et courtiers d’assurances (6622Z)</small>
            </div>
            <div class="col-2 header-advisor">
                <h5>Votre Conseiller : <br> <b>{{user.name}}</b></h5>
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
                            <img src="{{ url_for('static', filename='logo.png') }}" alt="Logo de la société" class="img-fluid"
                                style="height: 30px;">
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
                <p>Civilité : <span>${this.data.souscripteur.civilite}</span></p>
                <p>Nom Prénom : <span>${this.data.souscripteur.nom} ${this.data.souscripteur.prenom}</span></p>
                <p>Date de naissance : <span>${this.data.souscripteur.dateNaissance}</span></p>
                <p>Profession : <span>${this.data.souscripteur.profession}</span></p>
                <p>Numéro de téléphone : <span>${this.data.souscripteur.telephone}</span></p>
                <p>Adresse mail : <span>${this.data.souscripteur.adresseMail}</span></p>
                <p>Adresse postale : <span>${this.data.souscripteur.adressePostale}</span></p>
                <p class="text-center">Nous a consulté pour une assurance, <span>${this.data.souscripteur.type_assurance}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Les antécédents d’assurance</h5>
                </div>
                <p>Coefficient Bonus-Malus : <span>${this.data.antecedentsAssurance.bonusMalus}</span></p>
                <p>Nombre de mois d’assurances : <span>${this.data.antecedentsAssurance.moisAssurance}</span></p>
                <p>Motif de résiliation : <span>${this.data.antecedentsAssurance.motifResiliation}</span></p>
                <p>Nombre de sinistre matériel responsable : <span>${this.data.antecedentsAssurance.sinistreMaterielResponsable}</span></p>
                <p>Nombre de sinistre matériel non responsable : <span>${this.data.antecedentsAssurance.sinistreMaterielNonResponsable}</span></p>
                <p>Nombre de sinistre corporel responsable : <span>${this.data.antecedentsAssurance.sinistreCorporelResponsable}</span></p>
                <p>Nombre de sinistre corporel non responsable : <span>${this.data.antecedentsAssurance.sinistreCorporelNonResponsable}</span></p>
                <p>Nombre de bris de glace : <span>${this.data.antecedentsAssurance.brisDeGlace}</span></p>
                <p>Nombre de vol : <span>${this.data.antecedentsAssurance.vol}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Les antécédents du souscripteur</h5>
                </div>
                <p>Suspension de permis suite à alcoolémie : <span>${this.data.antecedentsSouscripteur.suspensionAlcoolemie}</span></p>
                <p>Suspension de permis suite à usage de stupéfiants : <span>${this.data.antecedentsSouscripteur.suspensionStupefiants}</span></p>
                <p>Suspension de permis pour perte de points : <span>${this.data.antecedentsSouscripteur.suspensionPoints}</span></p>
                <p>Annulation de permis pour perte de points : <span>${this.data.antecedentsSouscripteur.annulationPoints}</span></p>
                <p>Nombre de mois de suspension : <span>${this.data.antecedentsSouscripteur.moisSuspension}</span></p>
            </div>
            <div class="col-6 section-courier contract-details">
                <div class="centered-title">
                    <h5>Le véhicule</h5>
                </div>
                <p>Marque : <span>${this.data.vehicule.marque}</span></p>
                <p>Modèle : <span>${this.data.vehicule.modele}</span></p>
                <p>Puissance fiscale : <span>${this.data.vehicule.puissanceFiscale} CV</span></p>
                <p>1ère mise en circulation : <span>${this.data.vehicule.premiereMiseEnCirculation}</span></p>
                <p>Immatriculation : <span>${this.data.vehicule.immatriculation}</span></p>
                <p>Usage : <span>${this.data.vehicule.usage}</span></p>
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
                                    <th>CONFORT</th>
                                    <th>SERENITE</th>
                                    <th>FRANCHISES / PLAFOND</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Responsabilité civile</td>
                                    <td class="checkbox ${this.data.c11 ? 'checked' : ''}">${this.data.c11 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c12 ? 'checked' : ''}">${this.data.c12 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c13 ? 'checked' : ''}">${this.data.c13 ? '✔' : ''}</td>
                                    <td>${this.data.c14}</td>
                                </tr>
                                <tr>
                                    <td>Défense pénale et Recours</td>
                                    <td class="checkbox ${this.data.c21 ? 'checked' : ''}">${this.data.c21 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c22 ? 'checked' : ''}">${this.data.c22 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c23 ? 'checked' : ''}">${this.data.c23 ? '✔' : ''}</td>
                                    <td>${this.data.c24}</td>
                                </tr>
                                <tr>
                                    <td>Protection juridique</td>
                                    <td class="checkbox ${this.data.c31 ? 'checked' : ''}">${this.data.c31 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c32 ? 'checked' : ''}">${this.data.c32 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c33 ? 'checked' : ''}">${this.data.c33 ? '✔' : ''}</td>
                                    <td>${this.data.c34}</td>
                                </tr>
                                <tr>
                                    <td>Garantie conducteur</td>
                                    <td class="checkbox ${this.data.c41 ? 'checked' : ''}">${this.data.c41 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c42 ? 'checked' : ''}">${this.data.c42 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c43 ? 'checked' : ''}">${this.data.c43 ? '✔' : ''}</td>
                                    <td>${this.data.c44}</td>
                                </tr>
                                <tr>
                                    <td>Assistance</td>
                                    <td class="checkbox ${this.data.c51 ? 'checked' : ''}">${this.data.c51 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c52 ? 'checked' : ''}">${this.data.c52 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c53 ? 'checked' : ''}">${this.data.c53 ? '✔' : ''}</td>
                                    <td>${this.data.c54}</td>
                                </tr>
                                <tr>
                                    <td>Bris de Glace</td>
                                    <td class="checkbox ${this.data.c61 ? 'checked' : ''}">${this.data.c61 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c62 ? 'checked' : ''}">${this.data.c62 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c63 ? 'checked' : ''}">${this.data.c63 ? '✔' : ''}</td>
                                    <td>${this.data.c64}</td>
                                </tr>
                                <tr>
                                    <td>Vol-Incendie</td>
                                    <td class="checkbox ${this.data.c71 ? 'checked' : ''}">${this.data.c71 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c72 ? 'checked' : ''}">${this.data.c72 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c73 ? 'checked' : ''}">${this.data.c73 ? '✔' : ''}</td>
                                    <td>${this.data.c74}</td>
                                </tr>
                                <tr>
                                    <td>Catastrophes naturelles</td>
                                    <td class="checkbox ${this.data.c81 ? 'checked' : ''}">${this.data.c81 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c82 ? 'checked' : ''}">${this.data.c82 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c83 ? 'checked' : ''}">${this.data.c83 ? '✔' : ''}</td>
                                    <td>${this.data.c84}</td>
                                </tr>
                                <tr>
                                    <td>Catastrophes technologiques</td>
                                    <td class="checkbox ${this.data.c91 ? 'checked' : ''}">${this.data.c91 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c92 ? 'checked' : ''}">${this.data.c92 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c93 ? 'checked' : ''}">${this.data.c93 ? '✔' : ''}</td>
                                    <td>${this.data.c94}</td>
                                </tr>
                                <tr>
                                    <td>Attentats</td>
                                    <td class="checkbox ${this.data.c101 ? 'checked' : ''}">${this.data.c101 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c102 ? 'checked' : ''}">${this.data.c102 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c103 ? 'checked' : ''}">${this.data.c103 ? '✔' : ''}</td>
                                    <td>${this.data.c104}</td>
                                </tr>
                                <tr>
                                    <td>Dommages tous accidents</td>
                                    <td class="checkbox ${this.data.c111 ? 'checked' : ''}">${this.data.c111 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c112 ? 'checked' : ''}">${this.data.c112 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c113 ? 'checked' : ''}">${this.data.c113 ? '✔' : ''}</td>
                                    <td>${this.data.c114}</td>
                                </tr>
                                <tr>
                                    <td>Véhicule de remplacement</td>
                                    <td class="checkbox ${this.data.c121 ? 'checked' : ''}">${this.data.c121 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c122 ? 'checked' : ''}">${this.data.c122 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c123 ? 'checked' : ''}">${this.data.c123 ? '✔' : ''}</td>
                                    <td>${this.data.c124}</td>
                                </tr>
                                <tr>
                                    <td>Remboursement de franchise</td>
                                    <td class="checkbox ${this.data.c131 ? 'checked' : ''}">${this.data.c131 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c132 ? 'checked' : ''}">${this.data.c132 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c133 ? 'checked' : ''}">${this.data.c133 ? '✔' : ''}</td>
                                    <td>${this.data.c134}</td>
                                </tr>
                                <tr>
                                    <td>Panne mécanique</td>
                                    <td class="checkbox ${this.data.c141 ? 'checked' : ''}">${this.data.c141 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c142 ? 'checked' : ''}">${this.data.c142 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c143 ? 'checked' : ''}">${this.data.c143 ? '✔' : ''}</td>
                                    <td>${this.data.c144}</td>
                                </tr>
                                <tr>
                                    <td>Contenu du véhicule</td>
                                    <td class="checkbox ${this.data.c151 ? 'checked' : ''}">${this.data.c151 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c152 ? 'checked' : ''}">${this.data.c152 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c153 ? 'checked' : ''}">${this.data.c153 ? '✔' : ''}</td>
                                    <td>${this.data.c154}</td>
                                </tr>
                                <tr>
                                    <td>Indemnisation plus</td>
                                    <td class="checkbox ${this.data.c161 ? 'checked' : ''}">${this.data.c161 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c162 ? 'checked' : ''}">${this.data.c162 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c163 ? 'checked' : ''}">${this.data.c163 ? '✔' : ''}</td>
                                    <td>${this.data.c164}</td>
                                </tr>
                                <tr>
                                    <td>Garantie Gilet Airbag</td>
                                    <td class="checkbox ${this.data.c171 ? 'checked' : ''}">${this.data.c171 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c172 ? 'checked' : ''}">${this.data.c172 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c173 ? 'checked' : ''}">${this.data.c173 ? '✔' : ''}</td>
                                    <td>${this.data.c174}</td>
                                </tr>
                                <tr>
                                    <td>Garantie Casque</td>
                                    <td class="checkbox ${this.data.c181 ? 'checked' : ''}">${this.data.c181 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c182 ? 'checked' : ''}">${this.data.c182 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c183 ? 'checked' : ''}">${this.data.c183 ? '✔' : ''}</td>
                                    <td>${this.data.c184}</td>
                                </tr>
                                <tr>
                                    <td>Vol, Incendie, Explosion, Forces de la nature</td>
                                    <td class="checkbox ${this.data.c191 ? 'checked' : ''}">${this.data.c191 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c192 ? 'checked' : ''}">${this.data.c192 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c193 ? 'checked' : ''}">${this.data.c193 ? '✔' : ''}</td>
                                    <td>${this.data.c194}</td>
                                </tr>
                                <tr>
                                    <td>Equipement (option)</td>
                                    <td class="checkbox ${this.data.c201 ? 'checked' : ''}">${this.data.c201 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c202 ? 'checked' : ''}">${this.data.c202 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c203 ? 'checked' : ''}">${this.data.c203 ? '✔' : ''}</td>
                                    <td>${this.data.c204}</td>
                                </tr>
                                <tr>
                                    <td>Responsabilité civile professionnelle</td>
                                    <td class="checkbox ${this.data.c211 ? 'checked' : ''}">${this.data.c211 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c212 ? 'checked' : ''}">${this.data.c212 ? '✔' : ''}</td>
                                    <td class="checkbox ${this.data.c213 ? 'checked' : ''}">${this.data.c213 ? '✔' : ''}</td>
                                    <td>${this.data.c214}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style="line-height: 0.5; font-size: 12px;">Selon les informations de votre véhicule et vos besoins, nous vous
                            conseillons le produit
                            Assurance
                            <b>${this.data.produit}</b>
                        </p>
                        <p style="line-height: 0.5; font-size: 12px;">Pour la formule <b>${this.data.formule}</b> Auprès de notre partenaire
                            <b>${this.data.partenaire}</b>.
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
                                <img src="{{ url_for('static', filename='logo.png') }}" alt="Logo de la société"
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
                <p>La prime annuelle s'élève à <b>${this.data.prime_annuelle} €</b> et ( <b>${this.data.mois} €</b> mois) taxes incluses,
                    Frais de courtage :
                    <b>${this.data.frais_courtage} €</b>.
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
                <p>Je soussigné (e) <b>${this.data.souscripteur.nom} ${this.data.souscripteur.prenom}</b></p>
                <p>Autorise le cabinet CARREZ CONSEIL ASSURANCES à débiter la somme de <b>${this.data.frais} €</b>
                    Dont frais de dossiers et honoraire de courtage : <b>${this.data.frais_courtage} €</b> et acompte à reverser
                    à la
                    compagnie : <b>${this.data.acompte} €</b>
                </p>
                <ul class="list-unstyled d-flex justify-content-around">
                    <li class="mx-2"><b>${this.data.p1} €</b> régler le <b>${this.data.p1_date} ${this.data.pre1}</b></li>
                    <li class="mx-2"><b>${this.data.p2} €</b> à régler en <b>${this.data.p2_date} ${this.data.pre2}</b></li>
                    <li class="mx-2"><b>${this.data.p3} €</b> à régler avant le <b>${this.data.p3_date} ${this.data.pre3}</b></li>
                </ul>
                <div class="row ">
                    <div class="col signature-area ">
                        <p class="text-center">Le : <b>${this.data.date_signature}</b></p>
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
                                <img src="{{ url_for('static', filename='logo.png') }}" alt="Logo de la société"
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
                    <p class="reduced-space">${this.data.nom} ${this.data.prenom}</p>
                    <p class="reduced-space">${this.data.adresse}</p>
                    <p class="reduced-space">${this.data.telephone}</p>
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
            <p style="text-align: justify;">Je soussigné <b>${this.data.nom} ${this.data.prenom}</b>, demeurant à ${this.data.adresse}, donne mandat à la société CARREZ CONSEIL ASSURANCES, pour agir en mon nom et pour mon compte pour l’étude et le placement de solution d’assurance.</p>
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
</html>`

      console.log(htmlTemplate)
    },
  },
}
</script>

<template>
  <div>
    <form @submit.prevent="generateHTML">
      <!-- Le souscripteur ou le conducteur principal -->
      <h2>Le souscripteur ou le conducteur principal</h2>
      <div class="form-group">
        <label for="civilite">Civilité:</label>
        <input
          id="civilite"
          v-model="data.souscripteur.civilite"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="nom">Nom:</label>
        <input
          id="nom"
          v-model="data.souscripteur.nom"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="prenom">Prénom:</label>
        <input
          id="prenom"
          v-model="data.souscripteur.prenom"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="dateNaissance">Date de naissance:</label>
        <input
          id="dateNaissance"
          v-model="data.souscripteur.dateNaissance"
          type="date"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="profession">Profession:</label>
        <input
          id="profession"
          v-model="data.souscripteur.profession"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="telephone">Numéro de téléphone:</label>
        <input
          id="telephone"
          v-model="data.souscripteur.telephone"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="adresseMail">Adresse mail:</label>
        <input
          id="adresseMail"
          v-model="data.souscripteur.adresseMail"
          type="email"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="adressePostale">Adresse postale:</label>
        <input
          id="adressePostale"
          v-model="data.souscripteur.adressePostale"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="typeAssurance">Type d'assurance:</label>
        <input
          id="typeAssurance"
          v-model="data.souscripteur.type_assurance"
          type="text"
          class="form-control"
        >
      </div>

      <!-- Les antécédents d’assurance -->
      <h2>Les antécédents d’assurance</h2>
      <div class="form-group">
        <label for="bonusMalus">Coefficient Bonus-Malus:</label>
        <input
          id="bonusMalus"
          v-model="data.antecedentsAssurance.bonusMalus"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="moisAssurance">Nombre de mois d’assurances:</label>
        <input
          id="moisAssurance"
          v-model="data.antecedentsAssurance.moisAssurance"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="motifResiliation">Motif de résiliation:</label>
        <input
          id="motifResiliation"
          v-model="data.antecedentsAssurance.motifResiliation"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="sinistreMaterielResponsable">Nombre de sinistre matériel responsable:</label>
        <input
          id="sinistreMaterielResponsable"
          v-model="data.antecedentsAssurance.sinistreMaterielResponsable"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="sinistreMaterielNonResponsable">Nombre de sinistre matériel non responsable:</label>
        <input
          id="sinistreMaterielNonResponsable"
          v-model="data.antecedentsAssurance.sinistreMaterielNonResponsable"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="sinistreCorporelResponsable">Nombre de sinistre corporel responsable:</label>
        <input
          id="sinistreCorporelResponsable"
          v-model="data.antecedentsAssurance.sinistreCorporelResponsable"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="sinistreCorporelNonResponsable">Nombre de sinistre corporel non responsable:</label>
        <input
          id="sinistreCorporelNonResponsable"
          v-model="data.antecedentsAssurance.sinistreCorporelNonResponsable"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="brisDeGlace">Nombre de bris de glace:</label>
        <input
          id="brisDeGlace"
          v-model="data.antecedentsAssurance.brisDeGlace"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="vol">Nombre de vol:</label>
        <input
          id="vol"
          v-model="data.antecedentsAssurance.vol"
          type="text"
          class="form-control"
        >
      </div>

      <!-- Les antécédents du souscripteur -->
      <h2>Les antécédents du souscripteur</h2>
      <div class="form-group">
        <label for="suspensionAlcoolemie">Suspension de permis suite à alcoolémie:</label>
        <input
          id="suspensionAlcoolemie"
          v-model="data.antecedentsSouscripteur.suspensionAlcoolemie"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="suspensionStupefiants">Suspension de permis suite à usage de stupéfiants:</label>
        <input
          id="suspensionStupefiants"
          v-model="data.antecedentsSouscripteur.suspensionStupefiants"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="suspensionPoints">Suspension de permis pour perte de points:</label>
        <input
          id="suspensionPoints"
          v-model="data.antecedentsSouscripteur.suspensionPoints"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="annulationPoints">Annulation de permis pour perte de points:</label>
        <input
          id="annulationPoints"
          v-model="data.antecedentsSouscripteur.annulationPoints"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="moisSuspension">Nombre de mois de suspension:</label>
        <input
          id="moisSuspension"
          v-model="data.antecedentsSouscripteur.moisSuspension"
          type="text"
          class="form-control"
        >
      </div>

      <!-- Le véhicule -->
      <h2>Le véhicule</h2>
      <div class="form-group">
        <label for="marque">Marque:</label>
        <input
          id="marque"
          v-model="data.vehicule.marque"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="modele">Modèle:</label>
        <input
          id="modele"
          v-model="data.vehicule.modele"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="puissanceFiscale">Puissance fiscale:</label>
        <input
          id="puissanceFiscale"
          v-model="data.vehicule.puissanceFiscale"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="premiereMiseEnCirculation">1ère mise en circulation:</label>
        <input
          id="premiereMiseEnCirculation"
          v-model="data.vehicule.premiereMiseEnCirculation"
          type="date"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="immatriculation">Immatriculation:</label>
        <input
          id="immatriculation"
          v-model="data.vehicule.immatriculation"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="usage">Usage:</label>
        <input
          id="usage"
          v-model="data.vehicule.usage"
          type="text"
          class="form-control"
        >
      </div>

      <!-- Vos exigences et besoins -->
      <h2>Vos exigences et besoins</h2>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>GARANTIES</th>
            <th>CONTACT</th>
            <th>CONFORT</th>
            <th>SERENITE</th>
            <th>PLAFOND</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(guarantee, index) in guarantees"
            :key="index"
          >
            <td>{{ guarantee.name }}</td>
            <td>
              <input
                v-model="data[guarantee.contact]"
                type="checkbox"
              >
            </td>
            <td>
              <input
                v-model="data[guarantee.confort]"
                type="checkbox"
              >
            </td>
            <td>
              <input
                v-model="data[guarantee.serenite]"
                type="checkbox"
              >
            </td>
            <td>
              <input
                v-model="data[guarantee.plafond]"
                type="text"
              >
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Autres informations -->
      <h2>Autres informations</h2>
      <div class="form-group">
        <label for="produit">Produit:</label>
        <input
          id="produit"
          v-model="data.produit"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="formule">Formule:</label>
        <input
          id="formule"
          v-model="data.formule"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="partenaire">Partenaire:</label>
        <input
          id="partenaire"
          v-model="data.partenaire"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="prime_annuelle">Prime annuelle:</label>
        <input
          id="prime_annuelle"
          v-model="data.prime_annuelle"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="mois">Mois:</label>
        <input
          id="mois"
          v-model="data.mois"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="frais_courtage">Frais de courtage:</label>
        <input
          id="frais_courtage"
          v-model="data.frais_courtage"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="frais">Frais:</label>
        <input
          id="frais"
          v-model="data.frais"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="acompte">Acompte:</label>
        <input
          id="acompte"
          v-model="data.acompte"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="p1">P1:</label>
        <input
          id="p1"
          v-model="data.p1"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="p1_date">Date P1:</label>
        <input
          id="p1_date"
          v-model="data.p1_date"
          type="date"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="pre1">Pré1:</label>
        <input
          id="pre1"
          v-model="data.pre1"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="p2">P2:</label>
        <input
          id="p2"
          v-model="data.p2"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="p2_date">Date P2:</label>
        <input
          id="p2_date"
          v-model="data.p2_date"
          type="date"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="pre2">Pré2:</label>
        <input
          id="pre2"
          v-model="data.pre2"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="p3">P3:</label>
        <input
          id="p3"
          v-model="data.p3"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="p3_date">Date P3:</label>
        <input
          id="p3_date"
          v-model="data.p3_date"
          type="date"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="pre3">Pré3:</label>
        <input
          id="pre3"
          v-model="data.pre3"
          type="text"
          class="form-control"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
      >
        Generate HTML
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Add any scoped styles here */
</style>
