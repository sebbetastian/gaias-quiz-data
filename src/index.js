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
        //displaying the data **TEMPORARY🙈😳**
        arr.length == undefined ? isTru = 0 : isTru = arr.length;

        const numOfAns = strongIndex(isTru) +  ' - ' +' spillere😁'
        const el = document.getElementById('data')
        addContent(el, numOfAns);

        let countQOne = [0, 0, 0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[0] == 1 ? countQOne[0] += 1 : 0;
            a[0] == 2 ? countQOne[1] += 1 : 0;
            a[0] == 3 ? countQOne[2] += 1 : 0;
            a[0] == 4 ? countQOne[3] += 1 : 0;
            a[0] == 5 ? countQOne[4] += 1 : 0;
        }
        const q1 = strongIndex(countQOne[0]) + ' veldig bra' + ' | ' + strongIndex(countQOne[1]) + ' Middels bra' + ' | ' + strongIndex(countQOne[2]) + ' Dårlig' + ' | ' + strongIndex(countQOne[3]) + ' Veldig dårlig.'
        const el2 = document.getElementById('data1');
        addContent(el2, q1);

        let countQTwo = [0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[1] == 1 ? countQTwo[0] += 1 : 0;
            a[1] == 2 ? countQTwo[1] += 1 : 0;
            a[1] == 3 ? countQTwo[2] += 1 : 0;
            a[1] == 4 ? countQTwo[3] += 1 : 0;
            a[1] == 5 ? countQTwo[4] += 1 : 0;
        }
        const q2 = strongIndex(countQTwo) + " kommer snart"
        const el3 = document.getElementById('data2');
        addContent(el3, q2);

        let countQThree = [0, 0, 0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[2] == 1 ? countQThree[0] += 1 : 0;
            a[2] == 2 ? countQThree[1] += 1 : 0;
            a[2] == 3 ? countQThree[2] += 1 : 0;
            a[2] == 4 ? countQThree[3] += 1 : 0;
            a[2] == 5 ? countQThree[4] += 1 : 0;
        }
        const q3 = strongIndex(countQThree[0]) + " Logiskt oppsett | " + strongIndex(countQThree[1]) + ' Jeg Skjønte delvis | ' + strongIndex(countQThree[2]) + ' Jeg var usikker på hvor det startet | ' + strongIndex(countQThree[3]) + ' Jeg savnet følgende: kommentar boks'
        const el4 = document.getElementById('data3');
        addContent(el4, q3)

        let countQFour = [0, 0, 0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[3] == 1 ? countQFour[0] += 1 : 0;
            a[3] == 2 ? countQFour[1] += 1 : 0;
            a[3] == 3 ? countQFour[2] += 1 : 0;
            a[3] == 4 ? countQFour[3] += 1 : 0;
            a[3] == 5 ? countQFour[4] += 1 : 0;
        }
        const q4 = strongIndex(countQFour[0]) + " Mer aktiviteter | " + strongIndex(countQFour[1]) + ' Flere spill | ' + strongIndex(countQFour[2]) + ' Mer historie | ' + strongIndex(countQFour[3]) + ' En guide | ' + strongIndex(countQFour[4]) + ' Mer informasjonsmatriell'
        const el5 = document.getElementById('data4');
        addContent(el5, q4)

        let countQFive = [0, 0, 0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[4] == 1 ? countQFive[0] += 1 : 0;
            a[4] == 2 ? countQFive[1] += 1 : 0;
            a[4] == 3 ? countQFive[2] += 1 : 0;
            a[4] == 4 ? countQFive[3] += 1 : 0;
            a[4] == 5 ? countQFive[4] += 1 : 0;
        }
        const q5 = strongIndex(countQFive[0]) + " ja | " + strongIndex(countQFive[1]) + ' nei'
        const el6 = document.getElementById('data5');
        addContent(el6, q5)

        let countQSix = [0, 0, 0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[5] == 1 ? countQFive[0] += 1 : 0;
            a[5] == 2 ? countQFive[1] += 1 : 0;
            a[5] == 3 ? countQFive[2] += 1 : 0;
            a[5] == 4 ? countQFive[3] += 1 : 0;
            a[5] == 5 ? countQFive[4] += 1 : 0;
        }
        const q6 = strongIndex(countQSix[0]) + " ... | " + strongIndex(countQSix[1]) + ' ...'
        const el7 = document.getElementById('data6');
        addContent(el7, q6)

        let countQSeven = [0, 0, 0 ,0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[6] == 1 ? countQSix[0] += 1 : 0;
            a[6] == 2 ? countQSix[1] += 1 : 0;
            a[6] == 3 ? countQSix[2] += 1 : 0;
            a[6] == 4 ? countQSix[3] += 1 : 0;
            a[6] == 5 ? countQSix[4] += 1 : 0;
        }
        const q7 = strongIndex(countQSeven[0]) + " ... | " + strongIndex(countQSeven[1]) + ' ...'
        const el8 = document.getElementById('data7');
        addContent(el8, q7)

        let countQEight = [0, 0, 0 ,0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[7] == 1 ? countQSeven[0] += 1 : 0;
            a[7] == 2 ? countQSeven[1] += 1 : 0;
            a[7] == 3 ? countQSeven[2] += 1 : 0;
            a[7] == 4 ? countQSeven[3] += 1 : 0;
            a[7] == 5 ? countQSeven[4] += 1 : 0;
        }
        const q8 = strongIndex(countQEight[0]) + " ... | " + strongIndex(countQEight[1]) + ' ...'
        const el9 = document.getElementById('data8');
        addContent(el9, q8)

        let countQNine = [0, 0, 0 ,0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[8] == 1 ? countQEight[0] += 1: 0;
            a[8] == 2 ? countQEight[1] += 1: 0;
            a[8] == 3 ? countQEight[2] += 1: 0;
            a[8] == 4 ? countQEight[3] += 1: 0;
            a[8] == 5 ? countQEight[4] += 1: 0;
        }
        const q9 = strongIndex(countQNine[0]) + " ... | " + strongIndex(countQNine[1]) + ' ...'
        const el10 = document.getElementById('data9');
        addContent(el10, q9)

        let countQTen = [0, 0, 0 ,0, 0];
        for (let i = 0; i < arr.length; i++) {
            const a = sliceIntoChunks(arr[i], 1)
            //q1
            a[9] == 1 ? countQNine[0] += 1 : 0;
            a[9] == 2 ? countQNine[1] += 1 : 0;
            a[9] == 3 ? countQNine[2] += 1 : 0;
            a[9] == 4 ? countQNine[3] += 1 : 0;
            a[9] == 5 ? countQNine[4] += 1 : 0;
        }
        const q10 = strongIndex(countQTen[0]) + " ... | " + strongIndex(countQTen[1]) + ' ...'
        const el11 = document.getElementById('data10');
        addContent(el11, q10)

        counting = false;
        goOffline(db)
    }
});


