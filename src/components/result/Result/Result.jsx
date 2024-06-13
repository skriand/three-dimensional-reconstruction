import React from "react";
import {
  Button,
  Toolbar,
  ToolbarButton,
  Tooltip,
  makeStyles,
  typographyStyles,
} from "@fluentui/react-components";
import {
  ArrowLeftRegular,
  CheckmarkRegular,
  ImageAddRegular,
} from "@fluentui/react-icons";
import { useOrientation } from "@uidotdev/usehooks";
import { PointCloudVisualiser } from "point-cloud-visualiser";
import { useStyles } from "../../camera/Camera/Camera.styles";

const useClasses = makeStyles({
  toolbarTop: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
    left: 0,
    right: 0,
    top: 0,
    position: "fixed",
    zIndex: 1,
  },
  toolbarLeft: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
    left: 0,
    top: 0,
    bottom: 0,
    position: "fixed",
    zIndex: 1,
  },
  text: typographyStyles.subtitle1,
});

const points = [
  [-0.49355838, -0.90849, 0.23419394],
  [-1.0864003, -1.068506, 0.38957447],
  [-0.9012167, -0.98075783, 0.3658403],
  [-0.7630184, -0.9478193, 0.32703152],
  [-0.71872157, -0.9874666, 0.28085127],
  [-0.9763069, -1.0111512, 0.37946776],
  [-0.6890101, -0.9196156, 0.3130895],
  [-0.6574856, -0.92358613, 0.29644263],
  [-1.0033735, -1.0353312, 0.37538436],
  [-0.8355312, -1.0256584, 0.30733308],
  [-0.83409125, -1.0250252, 0.30711877],
  [-1.0773971, -1.1186838, 0.3522539],
  [-0.9591484, -1.0653236, 0.3359402],
  [-0.8454004, -1.0056951, 0.32509843],
  [-0.9939581, -1.0504184, 0.3615407],
  [-0.82255197, -0.97127587, 0.33791143],
  [-0.8350269, -0.9915019, 0.32991755],
  [-0.61606985, -0.90997577, 0.28737363],
  [-0.4986892, -0.93916184, 0.21404983],
  [-0.76740223, -0.9347714, 0.33752298],
  [-0.8812757, -0.99143994, 0.34967],
  [-0.7646035, -0.97737503, 0.30761987],
  [-0.7631993, -0.9787051, 0.30694333],
  [-0.8023187, -0.959497, 0.3364676],
  [-0.8818314, -0.9921798, 0.34987944],
  [-1.3199905, -1.1468304, 0.44147295],
  [-0.82589805, -0.93540484, 0.36200237],
  [-0.80878055, -0.9622156, 0.3380094],
  [-0.8820267, -0.9914948, 0.35028318],
  [-0.80466545, -0.9608001, 0.33670646],
  [-0.73916197, -0.93154776, 0.32703316],
  [-0.94865304, -1.0179833, 0.36304948],
  [-0.9992416, -1.0510954, 0.36330047],
  [-0.7115684, -0.92960644, 0.31660998],
  [-0.9004435, -0.9819973, 0.3646685],
  [-0.9609509, -1.0396128, 0.35346738],
  [-0.5455673, -0.917049, 0.25123286],
  [-0.6154311, -0.9094148, 0.28712553],
  [-0.9141426, -1.012942, 0.342731],
  [-0.8635619, -1.0160189, 0.32609513],
  [-1.1658926, -1.100635, 0.40427375],
  [-0.9944158, -1.048945, 0.3622099],
  [-0.50306565, -0.91303355, 0.23534383],
  [-0.86410767, -1.0140966, 0.32749408],
  [-0.89483434, -1.0511247, 0.3160065],
  [-0.8353435, -1.0253447, 0.30720466],
  [-0.9473773, -1.0187937, 0.361705],
  [-0.83520055, -0.9586425, 0.35144907],
  [-1.0555832, -1.0411452, 0.39466023],
  [-0.88396937, -0.9927672, 0.35097167],
  [-0.66876554, -0.9274852, 0.29879564],
  [-0.7654399, -0.9781843, 0.3080739],
  [-0.8994176, -0.9817679, 0.36462224],
  [-0.5525104, -0.9053238, 0.26252088],
  [-0.82511556, -0.93509334, 0.3618377],
  [-0.9024628, -0.9810483, 0.36650002],
  [-0.76471305, -0.97861063, 0.30765614],
  [-0.80743396, -0.92573607, 0.36030662],
  [-0.86231947, -1.0154424, 0.32603398],
  [-0.75666976, -0.9579105, 0.3178926],
  [-0.8216887, -0.97104144, 0.33765733],
  [-0.69085366, -0.96211714, 0.28548348],
  [-1.1060358, -1.0923918, 0.38123572],
  [-1.2313273, -1.1106582, 0.42616948],
  [-0.5355651, -0.94556546, 0.22678106],
  [-0.8335824, -0.9881623, 0.33472094],
  [-0.7337231, -0.94296217, 0.3338259],
  [-0.76856756, -0.93506974, 0.33774775],
  [-0.7007134, -0.9391737, 0.3055733],
  [-0.49930727, -0.9394508, 0.21429487],
  [-0.7433043, -0.99167943, 0.28927556],
  [-0.6690012, -0.9275279, 0.29896548],
  [-0.8017434, -0.95933354, 0.33659458],
  [-0.6892379, -0.91968095, 0.31281468],
  [-0.78111804, -0.96999025, 0.31974158],
  [-1.2329673, -1.111556, 0.42671636],
  [-0.68686897, -0.89786434, 0.32437634],
  [-0.7500506, -0.99262285, 0.2913359],
  [-0.96017724, -1.0395936, 0.3537432],
  [-0.9805477, -0.98984677, 0.39486557],
  [-0.822247, -0.9326943, 0.36191958],
  [-0.8627726, -1.0420642, 0.3641051],
  [-0.66820014, -0.9270692, 0.29823807],
  [-0.5074489, -0.9435109, 0.21909776],
  [-1.2101151, -1.2674598, 0.30075404],
  [-0.90092355, -0.9823383, 0.36471483],
  [-0.82243985, -0.97127545, 0.33802512],
  [-0.90232867, -0.98068523, 0.3664356],
  [-0.95559096, -1.064085, 0.3351432],
  [-0.64833176, -0.9060395, 0.30309695],
  [-0.766634, -0.9345212, 0.33687985],
  [-0.50145644, -0.87994033, 0.25698525],
  [-1.1116526, -1.085418, 0.40331],
  [-1.0570171, -1.0390055, 0.39606166],
  [-0.83243734, -0.95741844, 0.35065657],
  [-0.690074, -0.961327, 0.2856564],
  [-0.5349583, -0.9457651, 0.22704633],
  [-0.85684043, -0.96234983, 0.3592003],
  [-0.6485651, -0.93573475, 0.28437978],
  [-0.49212137, -0.93939394, 0.21362552],
  [-0.6954421, -0.91650754, 0.31756017],
  [-0.9757929, -1.0109518, 0.3794442],
  [-0.69263756, -0.9218068, 0.31326044],
  [-0.7444047, -0.92638713, 0.3506302],
  [-0.65727186, -0.9237616, 0.29593232],
  [-0.7922151, -1.0197722, 0.29219097],
  [-1.1071476, -1.0944022, 0.42480186],
  [-0.8033509, -1.0237485, 0.2940153],
  [-0.47399127, -0.93375605, 0.20891455],
  [-1.0205837, -1.0693055, 0.38482976],
  [-0.7933924, -0.9299189, 0.30758265],
  [-0.7107452, -0.91440237, 0.3254693],
  [-1.1075094, -1.0835778, 0.4018248],
  [-0.7321046, -0.9318705, 0.34319332],
  [-0.7278806, -0.9308947, 0.34150058],
  [-0.83182144, -0.95535916, 0.35031185],
  [-0.65739334, -0.92363524, 0.29654053],
  [-0.5464672, -0.9170913, 0.25185072],
  [-0.80440915, -0.9901631, 0.31451815],
  [-1.2323525, -1.1105982, 0.42646968],
  [-0.6641587, -0.9157162, 0.30469015],
  [-0.55346644, -0.89379287, 0.2706512],
  [-0.38370356, -0.9451449, 0.22209825],
  [-0.64541477, -0.9339984, 0.28465787],
  [-0.6515897, -0.93628174, 0.28527483],
  [-0.74596477, -0.9219504, 0.33564872],
  [-0.7713867, -0.9788787, 0.3100353],
  [-0.69626105, -0.92247474, 0.3142829],
  [-0.7587132, -0.9365317, 0.28016973],
  [-0.4204491, -0.97244227, 0.22420982],
  [-0.49318025, -0.90775007, 0.23386067],
  [-0.83289564, -0.95868546, 0.35048345],
  [-0.7590162, -0.96466607, 0.33171186],
  [-0.8531266, -0.9350191, 0.3161208],
  [-0.9308584, -1.0071718, 0.36181274],
  [-0.71027917, -0.9139729, 0.32603773],
  [-0.9544472, -1.0648415, 0.33471552],
  [-1.2803653, -1.1781242, 0.4698285],
  [-0.9749396, -1.009002, 0.42241406],
  [-0.48223892, -0.93674004, 0.21125987],
  [-0.9675225, -1.0831641, 0.33942997],
  [-0.85326385, -0.9996576, 0.30524075],
  [-0.72953516, -0.94496256, 0.36795864],
  [-0.86071277, -1.0122699, 0.35667604],
  [-0.7765482, -0.97146726, 0.3356711],
  [-1.2446191, -1.2992264, 0.3021886],
  [-1.1159273, -1.0880915, 0.41568893],
  [-0.9440278, -1.012663, 0.36859155],
  [-0.9163211, -0.9654722, 0.3682183],
  [-0.8472061, -0.9445158, 0.3123301],
  [-0.5272521, -0.9440257, 0.23445325],
  [-0.9790689, -0.9874005, 0.39506763],
  [-0.8214751, -1.0163667, 0.31195757],
  [-0.7371047, -0.94304836, 0.3359581],
  [-0.75376886, -0.92994446, 0.3523114],
  [-0.62743986, -0.89166015, 0.23681511],
  [-1.1163468, -1.0909667, 0.44269896],
  [-0.53096044, -0.88357633, 0.23733246],
  [-1.205721, -1.1694282, 0.37718737],
  [-1.2187185, -1.2731802, 0.31305823],
  [-1.74004, -1.3502458, 0.48606896],
  [-0.62804186, -1.0015126, 0.27820775],
  [-0.8207132, -0.9254631, 0.35538256],
  [-0.6851463, -0.8970708, 0.3238696],
  [-0.6467112, -0.90787554, 0.31539586],
  [-0.65235394, -0.93641824, 0.28635177],
  [-0.9394485, -1.0043944, 0.39699474],
  [-0.5287753, -0.8985334, 0.2564726],
  [-0.70957595, -0.92857903, 0.3156826],
  [-0.93404853, -1.0038445, 0.33717567],
  [-0.667178, -0.913947, 0.29089972],
  [-0.7981631, -0.939019, 0.32568103],
  [-0.62637717, -0.8948403, 0.2740783],
  [-0.7450315, -0.9654731, 0.2829836],
  [-0.8321903, -0.95550543, 0.35259998],
  [-0.7314732, -0.94927907, 0.31265196],
  [-0.52178055, -0.9146018, 0.22290108],
  [-0.95296466, -1.0638413, 0.33398247],
  [-0.56590396, -0.9477273, 0.2397995],
  [-0.52887785, -0.92782897, 0.23685452],
  [-1.2827218, -1.1434132, 0.47659636],
  [-0.7717197, -0.9716943, 0.3669375],
  [-0.6573367, -0.924308, 0.29606685],
  [-0.6464703, -0.9216882, 0.27759537],
  [-0.45815262, -0.9283484, 0.2050126],
  [-0.5237779, -1.0389464, 0.31812397],
  [-0.8035947, -0.9885027, 0.32640308],
  [-0.42924967, -0.9937974, 0.26187655],
  [-0.5264906, -0.8979061, 0.2557413],
  [-0.7414048, -0.92717254, 0.26919013],
  [-0.64577657, -0.89889413, 0.26737607],
  [-0.67259866, -0.95811087, 0.22472091],
  [-0.6860159, -0.9476928, 0.27212816],
  [-0.471732, -0.93188524, 0.20734507],
  [-0.501361, -1.0384169, 0.3274785],
  [-0.5338221, -0.8863003, 0.26677042],
  [-0.83912104, -1.0404862, 0.3016601],
  [-0.5303682, -0.86838335, 0.25685778],
  [-0.83846045, -1.0400293, 0.30151245],
  [-0.7449606, -0.96203923, 0.3608465],
  [-1.0210334, -1.0588518, 0.3905188],
  [-0.56552744, -0.9477485, 0.23943396],
  [-0.42921582, -0.96657723, 0.23129332],
  [-0.45773584, -0.9279491, 0.20505302],
  [-0.4739274, -0.93361413, 0.20923471],
  [-0.55538565, -0.97840744, 0.2779264],
  [-0.46274164, -0.91752684, 0.19857322],
  [-0.5517123, -0.90797806, 0.27104768],
  [-0.47380742, -0.81788194, 0.20255122],
  [-0.6543635, -0.9518229, 0.32034472],
  [-0.4329554, -1.0426066, 0.17359497],
  [-0.46005452, -1.0382558, 0.17954218],
  [-0.4870618, -1.0427935, 0.1843872],
  [-0.4344889, -1.0319481, 0.17745985],
  [-0.6149109, -0.91734016, 0.33006307],
  [-0.5985685, -0.72674364, 0.24357533],
  [-0.46533078, -0.8009683, 0.19323546],
  [-0.86660683, -1.0063677, 0.37368515],
  [-0.47293833, -0.8163983, 0.20205647],
  [-0.6517211, -0.7126947, 0.2525249],
  [-0.6457562, -0.72481406, 0.26498502],
  [-0.69740725, -0.7347715, 0.25208345],
  [-0.7676894, -0.920427, 0.31602484],
  [-0.75946486, -0.80925786, 0.30322978],
  [-0.6657284, -0.75400794, 0.26272625],
  [-0.5435417, -0.7255254, 0.23699398],
  [-0.66846764, -0.6882612, 0.25716144],
  [-0.985694, -0.9220764, 0.3601338],
  [-0.45867676, -0.7449181, 0.18401897],
  [-0.47171685, -0.8002276, 0.19553626],
  [-0.66340953, -0.64429396, 0.25956264],
  [-0.68106073, -0.7442204, 0.27532437],
  [-0.5856438, -0.70526654, 0.24405485],
  [-0.5702535, -0.8475551, 0.3062012],
  [-0.86731553, -1.0068954, 0.3741699],
  [-0.7404463, -0.76521355, 0.313369],
  [-0.8341999, -0.87405974, 0.32988703],
  [-0.53859234, -0.7582746, 0.24858144],
  [-0.82983583, -0.9416196, 0.38752052],
  [-0.98461837, -0.8734631, 0.33754495],
  [-0.513374, -0.7322243, 0.23217921],
  [-0.89462864, -0.9611413, 0.23490416],
  [-0.61866736, -0.7830276, 0.29247186],
  [-0.48927844, -0.7991391, 0.2031389],
  [-0.872373, -0.8993097, 0.34561914],
  [-0.57882917, -0.71988285, 0.23840709],
  [-0.70299006, -0.78725624, 0.31253487],
  [-0.6322089, -0.69726276, 0.27515537],
  [-0.72975767, -1.0142694, 0.35721213],
  [-0.6022643, -0.70530415, 0.24190046],
  [-0.76074284, -0.8173959, 0.31723306],
  [-0.5301986, -0.7744259, 0.26063088],
  [-0.5623791, -0.73370963, 0.23905835],
  [-0.6544639, -0.95210177, 0.32026717],
  [-0.9185916, -0.9975041, 0.22923712],
  [-0.91133195, -0.99658495, 0.2405931],
  [-0.5303967, -0.75911963, 0.23172675],
  [-0.64760005, -0.7666838, 0.29709065],
  [-0.8980278, -0.8904793, 0.3504234],
  [-0.60637, -0.89328104, 0.3068141],
  [-0.5814472, -0.79817045, 0.28542432],
  [-0.58906883, -0.9187346, 0.29605585],
  [-0.9144712, -0.94959146, 0.36140355],
  [-0.5530372, -0.7545026, 0.26893696],
  [-0.52937055, -0.7582325, 0.23164724],
  [-0.6412326, -0.7291763, 0.2491137],
  [-0.5703784, -0.7724605, 0.2674451],
  [-0.88170516, -0.8221178, 0.30563924],
  [-0.94864166, -0.7878681, 0.28210297],
  [-0.57068175, -0.7777669, 0.2577265],
  [-0.5194689, -0.7469023, 0.24190421],
  [-0.67746806, -0.7132082, 0.25645906],
  [-0.6163811, -0.70778656, 0.24800768],
  [-0.5803062, -0.79811466, 0.28537273],
  [-0.8582049, -1.0174738, 0.37715816],
  [-0.6007854, -0.7596429, 0.24124072],
  [-0.89641064, -0.96059805, 0.2344199],
  [-0.5822236, -0.73768413, 0.25961164],
  [-0.5500651, -1.0796396, 0.22702742],
  [-0.6091886, -0.7323995, 0.24511406],
  [-0.51752794, -0.7247657, 0.2522636],
  [-0.66814893, -0.90379345, 0.2990925],
  [-0.72508085, -0.93959576, 0.3291186],
  [-0.5417233, -0.6464902, 0.21832334],
  [-1.3231272, -1.8231078, 0.6242345],
  [-0.53455925, -0.74239236, 0.26759934],
  [-0.67548525, -1.3039006, 0.30674955],
  [-0.8008624, -0.791564, 0.3017689],
  [-0.6950041, -0.76634824, 0.29665396],
  [-0.57641715, -0.6673467, 0.23824003],
  [-0.64363253, -0.7423229, 0.23929927],
  [-0.5887265, -0.73180634, 0.24115951],
  [-0.67589605, -0.73972183, 0.27352768],
  [-0.529117, -0.70365965, 0.23711467],
  [-0.39360496, -0.53855425, 0.11297945],
  [-0.47479773, -0.8187443, 0.20297855],
  [-0.4809554, -1.0439218, 0.18172969],
  [-0.5003196, -0.71078944, 0.23903112],
  [-0.69192076, -0.8600004, 0.31857347],
  [-0.7353169, -0.87973726, 0.29238755],
  [-0.58162564, -0.66668135, 0.24649866],
  [-0.5427518, -0.7321568, 0.2534399],
  [-0.7443757, -0.8379005, 0.2935284],
  [-0.5784522, -0.7765127, 0.29292822],
  [-0.5525252, -1.1985261, 0.26891473],
  [-0.466685, -0.83973694, 0.21410301],
  [-0.5844491, -0.7267093, 0.23741063],
  [-0.60803014, -0.92370063, 0.15281178],
  [-0.56258416, -0.91629297, 0.28761435],
  [-0.64795315, -0.7636958, 0.27942437],
  [-0.73233175 - 0.8103976, 0.2890666],
  [-0.54286295, -0.7477796, 0.22810915],
  [-0.56519186, -0.6739261, 0.2446522],
  [-0.9140313, -0.9893965, 0.23733538],
  [-0.88328075, -0.86347765, 0.33045718],
  [-0.4730221, -0.7060097, 0.23830704],
  [-0.601156, -0.71518755, 0.25837865],
  [-0.64192593, -0.6720093, 0.24906437],
  [-0.5307525, -0.75975084, 0.23181112],
  [-0.58971936, -0.7330925, 0.24185155],
  [-0.50756276, -0.73970366, 0.23715311],
  [-0.6934948, -0.7571158, 0.28506246],
  [-0.5848749, -0.73012143, 0.23828954],
  [-0.4260451, -1.0152059, 0.18212555],
  [-0.5806343, -0.7825711, 0.27458256],
  [-0.59832996, -0.72873646, 0.24362406],
  [-0.6085819, -0.6967485, 0.2382838],
  [-0.70568424, -0.8298354, 0.2790606],
  [-0.59201366, -0.78838235, 0.22707808],
  [-0.75261194, -0.7505641, 0.28699756],
  [-0.5288337, -0.7031887, 0.23730657],
  [-0.5325913, -0.6754978, 0.23386581],
  [-0.57044536, -0.75814414, 0.23955815],
  [-0.60728925, -0.7019151, 0.2462297],
  [-0.5236854, -0.92821276, 0.27177203],
  [-0.53546834, -0.7550411, 0.23255737],
  [-0.6397898, -0.7267452, 0.2479008],
  [-0.5372303, -0.75979954, 0.2485296],
  [-0.56855077, -0.8285718, 0.25501978],
  [-0.70102566, -0.9308373, 0.30824983],
  [-0.62649786, -0.7229944, 0.2503643],
  [-0.62539446, -0.6390788, 0.25517687],
  [-0.68640095, -0.91167355, 0.33004498],
  [-0.5396619, -0.7999549, 0.22361362],
  [-0.5170363, -0.76465416, 0.23412782],
  [-0.60996526, -0.82348686, 0.27084002],
  [-0.61025155, -0.7213921, 0.22754939],
  [-0.5656988, -0.7684598, 0.2555837],
  [-0.53457814, -0.66024286, 0.15270829],
  [-1.0353075, -1.3747952, 0.42222568],
  [-0.5762962, -0.8809843, 0.15378094],
  [-0.5802318, -1.4464353, 0.37441707],
  [-0.45438763, -0.83383834, 0.18986203],
  [-0.48528248, -0.7494448, 0.23355485],
  [-0.5048335, -0.7394188, 0.23640239],
  [-0.50038975, -0.5227572, 0.11694568],
  [-0.5222563, -0.78509647, 0.26501215],
  [-0.5675489, -0.6127242, 0.2065345],
  [-0.5567346, -0.747669, 0.24523582],
  [-0.5169894, -0.6507756, 0.19688354],
  [-0.5259446, -0.72335196, 0.22715451],
  [-0.5506306, -0.8487797, 0.26626185],
  [-0.521524, -1.347632, 0.32429665],
  [-0.5128445, -0.69747627, 0.23558006],
  [-0.57544065, -0.7383383, 0.21398643],
  [-0.5442432, -0.6873849, 0.2498698],
  [-0.6123265, -0.80903536, 0.23018609],
  [-0.5535431, -0.7189363, 0.26517758],
  [-0.6471453, -0.7585444, 0.274723],
  [-0.6137018, -0.8625774, 0.27260405],
  [-0.59630775, -0.90423393, 0.29779068],
  [-1.2372243, -1.648397, 0.54732025],
  [-0.4582994, -0.8559677, 0.1934424],
  [-0.5533948, -0.7543168, 0.23124228],
  [-0.45398384, -0.65497947, 0.16371271],
  [-0.50708663, -0.79687357, 0.25047797],
];

export const Result = () => {
  const classes = useStyles();
  const orientation = useOrientation();
  const styles = useClasses();

  return (
    <div className={classes.root}>
      <Toolbar
        aria-label="Large"
        size="large"
        className={
          orientation.type === "landscape-primary"
            ? styles.toolbarLeft
            : styles.toolbarTop
        }
        vertical={orientation.type === "landscape-primary"}
      >
        <Tooltip content="Remove shadow" relationship="label">
          <ToolbarButton
            aria-label="Remove shadow"
            icon={<ArrowLeftRegular />}
          />
        </Tooltip>
        <span className={styles.text}>Result</span>
      </Toolbar>
      <PointCloudVisualiser
        styles={{ height: "100%" }}
        points={points}
        //numberOfPoints={100000}
        pointColour={"#33E3FF"}
        //cameraPosition={[3, 3, 3]}
      />
      <div
        className={
          orientation.type === "landscape-primary"
            ? classes.toolbarRight
            : classes.toolbarBottom
        }
      >
        <Toolbar
          aria-label="Large"
          size="large"
          vertical={orientation.type === "landscape-primary"}
          className={classes.toolbar}
        >
          <Button
            size="large"
            appearance="outline"
            aria-label="Add image"
            icon={<ImageAddRegular />}
          />
          <Button
            icon={<CheckmarkRegular />}
            size="large"
            appearance="outline"
          ></Button>
        </Toolbar>
      </div>
    </div>
  );
};