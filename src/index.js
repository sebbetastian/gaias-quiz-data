//lodash is for webpack 
import _ from 'lodash';
//importing firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';
import { getDatabase, ref, onValue, goOnline, goOffline} from "firebase/database";
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
goOnline(db)
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
        //q1
        let countQOne = [0, 0, 0, 0];
        //q2
        let countQTwo = [0];
        //q3
        let countQThree = [0, 0, 0, 0];
        //q4
        let countQFour = [0, 0, 0, 0, 0];
        //q5
        let countQFive = [0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[0] == 1 ? countQOne[0] += 1 : countQOne[0];
            a[0] == 2 ? countQOne[1] += 1 : countQOne[1];
            a[0] == 3 ? countQOne[2] += 1 : countQOne[2];
            a[0] == 4 ? countQOne[3] += 1 : countQOne[3];
            //q2
            a[1] == 1 ? countQTwo[0] += 1 : countQTwo[0];
            a[1] == 2 ? countQTwo[1] += 1 : countQTwo[1];
            a[1] == 3 ? countQTwo[2] += 1 : countQTwo[2];
            a[1] == 4 ? countQTwo[3] += 1 : countQTwo[3];
            //q3
            a[2] == 1 ? countQThree[0] += 1 : countQThree[0];
            a[2] == 2 ? countQThree[1] += 1 : countQThree[1];
            a[2] == 3 ? countQThree[2] += 1 : countQThree[2];
            a[2] == 4 ? countQThree[3] += 1 : countQThree[3];
            //q4
            a[3] == 1 ? countQFour[0] += 1 : countQFour[0];
            a[3] == 2 ? countQFour[1] += 1 : countQFour[1];
            a[3] == 3 ? countQFour[2] += 1 : countQFour[2];
            a[3] == 4 ? countQFour[3] += 1 : countQFour[3];
            a[3] == 5 ? countQFour[4] += 1 : countQFour[4];
            //q5
            a[4] == 1 ? countQFive[0] += 1 : countQFive[0];
            a[4] == 2 ? countQFive[1] += 1 : countQFive[1];
            a[4] == 3 ? countQFive[2] += 1 : countQFive[2];
            a[4] == 4 ? countQFive[4] += 1 : countQFive[4];
        }
        //displaying the data
        arr.length == undefined ? isTru = 0 : isTru = arr.length;
        const numOfAns = strongIndex(isTru) +  ' - ' +' spillere😁'
        addContent(el, numOfAns);
        const q1 = strongIndex(countQOne[0]) + ' veldig bra' + ' | ' + strongIndex(countQOne[1]) + ' Middels bra' + ' | ' + strongIndex(countQOne[2]) + ' Dårlig' + ' | ' + strongIndex(countQOne[3]) + ' Veldig dårlig.'
        addContent(el2, q1);
        const q2 = strongIndex(countQTwo) + " kommer snart"
        addContent(el3, q2);
        const q3 = strongIndex(countQThree[0]) + " Logiskt oppsett | " + strongIndex(countQThree[1]) + ' Jeg Skjønte delvis | ' + strongIndex(countQThree[2]) + ' Jeg var usikker på hvor det startet | ' + strongIndex(countQThree[3]) + ' Jeg savnet følgende: kommentar boks'
        addContent(el4, q3)
        const q4 = strongIndex(countQFour[0]) + " Mer aktiviteter | " + strongIndex(countQFour[1]) + ' Flere spill | ' + strongIndex(countQFour[2]) + ' Mer historie | ' + strongIndex(countQFour[3]) + ' En guide | ' + strongIndex(countQFour[4]) + ' Mer informasjonsmatriell'
        addContent(el5, q4)
        const q5 = strongIndex(countQFive[0]) + " Ja | " + strongIndex(countQFive[1]) + ' Nei'
        addContent(el6, q5)
        counting = false;
        goOffline(db)
    }
});


