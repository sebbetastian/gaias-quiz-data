//lodash is for webpack 
import _ from 'lodash';
//importing firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';
import { getDatabase, ref, onValue} from "firebase/database";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

//init the database config
const app = initializeApp(firebaseConfig);

const el = document.getElementById('data')
const el2 = document.getElementById('data1');
const el3 = document.getElementById('data2');
const el4 = document.getElementById('data3');
const el5 = document.getElementById('data4');
const el6 = document.getElementById('data5');

const reloadBtn = document.getElementById('reload-btn');
//"fetch data"
reloadBtn.addEventListener('click', () => {
    location.reload();
})

// Important variables
const arr = [];
let counting = true;
let isTru;

function strongIndex(string) {
    return '<strong>' + string + '</strong>'
}

function addContent(el0, content) {
    el0.innerHTML = "<td class='data font-size'>" + content; + "</td>"
}

function sliceIntoChunks(arrs, chunkSize) {
    const res = [];
    for (let i = 0; i < arrs.length; i += chunkSize) {
        const chunk = arrs.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const db = getDatabase();
//getting the first node parent in the database
const answers = (ref(db, 'answers/'));

//getting the first node children from the node parent
    onValue(answers, (snapshot) => {
    //giving each id node from answers one childKey const
    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        //getting every answer using the childkey var
        const answerFilter = (ref(db, 'answers/' + childKey))
        //pushing each answer to an array with an answer key
        onValue(answerFilter, (snapshot) => {
            snapshot.forEach((snapshotCount) => {
                const Key = snapshotCount.key;
                const childData = snapshotCount.val()
                arr.push(childData);
            })
        })
    })
    if (counting == true) {
        let countQOne1 = 0;
        let countQOne2 = 0;
        let countQOne3 = 0;
        let countQOne4 = 0;

        let countQTwo = 0;

        let countQThree1 = 0;
        let countQThree2 = 0;
        let countQThree3 = 0;
        let countQThree4 = 0;

        let countQFour1 = 0;
        let countQFour2 = 0;
        let countQFour3 = 0;
        let countQFour4 = 0;

        let countQFive1 = 0;
        let countQFive2 = 0;
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[0] == 1 ? countQOne1 += 1 : countQOne1;
            a[0] == 2 ? countQOne2 += 1 : countQOne2;
            a[0] == 3 ? countQOne3 += 1 : countQOne3;
            a[0] == 4 ? countQOne4 += 1 : countQOne4;
            //q2
            a[1] == 1 ? countQTwo += 1 : countQTwo;
            //q3
            a[2] == 1 ? countQThree1 += 1 : countQThree1;
            a[2] == 2 ? countQThree2 += 1 : countQThree2;
            a[2] == 3 ? countQThree3 += 1 : countQThree3;
            a[2] == 4 ? countQThree4 += 1 : countQThree4;
            //q4
            a[3] == 1 ? countQFour1 += 1 : countQFour1;
            a[3] == 2 ? countQFour2 += 1 : countQFour2;
            a[3] == 3 ? countQFour3 += 1 : countQFour3;
            a[3] == 4 ? countQFour4 += 1 : countQFour4;
            //q5
            a[4] == 1 ? countQFive1 += 1 : countQFive1;
            a[4] == 2 ? countQFive2 += 1 : countQFive2;
        }
        //displaying the data
        arr.length == undefined ? isTru = 0 : isTru = arr.length;
        const numOfAns = strongIndex(isTru) +  ' - ' +' spillere😁'
        addContent(el, numOfAns);
        const q1 = strongIndex(countQOne1) + ' veldig bra' + ' | ' + strongIndex(countQOne2) + ' Middels bra' + ' | ' + strongIndex(countQOne3) + ' Dårlig' + ' | ' + strongIndex(countQOne4) + ' Veldig dårlig.'
        addContent(el2, q1);
        const q2 = strongIndex(countQTwo) + " kommer snart"
        addContent(el3, q2);
        const q3 = strongIndex(countQThree1) + " Logiskt oppsett | " + strongIndex(countQThree2) + ' Jeg Skjønte delvis | ' + strongIndex(countQThree3) + ' Jeg var usikker på hvor det startet | ' + strongIndex(countQThree4) + ' Jeg savnet følgende: kommentar boks'
        addContent(el4, q3)
        const q4 = strongIndex(countQFour1) + " Mer aktiviteter | " + strongIndex(countQFour2) + ' Flere spill | ' + strongIndex(countQFour3) + ' Mer historie | ' + strongIndex(countQFour4) + ' En guide'
        addContent(el5, q4)
        const q5 = strongIndex(countQFive1) + " Ja | " + strongIndex(countQFive2) + ' Nei'
        addContent(el6, q5)
        counting = false;
    }
});

