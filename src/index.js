//lodash is for webpack 
import _ from 'lodash';
//importing firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';
import { getDatabase, ref, onValue, goOnline, goOffline} from "firebase/database";
import { Button } from 'bootstrap';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

//init the database config
const app = initializeApp(firebaseConfig);
const db = getDatabase();
goOnline(db)

const reloadBtn = document.getElementById('reload-btn');
//"fetch data"
reloadBtn.addEventListener('click', () => {
    location.reload();
})

// Important variables
const elements = []
const arr = [];
let counting = true;
let isTru;

//important functions
function sliceIntoChunks(arrs, chunkSize) {
    const res = [];
    for (let i = 0; i < arrs.length; i += chunkSize) {
        const chunk = arrs.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
//for every answer, increment counter arrays by one per answer alternative
const counter = (array, num, count) => {
    for (let i = 0; i < arr.length; i++) {
        const a = sliceIntoChunks(array[i], 1)
        a[num] == 1 ? count[0] += 1 : 0
        a[num] == 2 ? count[1] += 1 : 0
        a[num] == 3 ? count[2] += 1 : 0
        a[num] == 4 ? count[3] += 1 : 0
        a[num] == 5 ? count[4] += 1 : 0
    }
}

function addContent(el0, content) {
    el0.innerHTML = "<td class='data font-size'>" + content; + "</td>"
}

function strongIndex(string) {
    return '<strong>' + string + '</strong>'
}

const elArr = Array.from(document.querySelectorAll('[data]'))
function addAllContent(num, count) {
    elArr.forEach(element => {
        elements.push(element)
    });
    return elements[num].innerHTML = count + ' ';
}

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
    if (counting === true) {
        //displaying the data **TEMPORARY🙈😳**
        arr.length == undefined ? isTru = 0 : isTru = arr.length;
        const numOfAns = strongIndex(isTru) +  ' - ' +' spillere😁'
        const el = document.getElementById('numberOfPlayers')
        addContent(el, numOfAns);

        let countQOne = [0, 0, 0, 0, 0];
        counter(arr, 0, countQOne);
        const q1 = strongIndex(countQOne[0]) + ' veldig bra' + ' | ' + strongIndex(countQOne[1]) + ' Middels bra' + ' | ' + strongIndex(countQOne[2]) + ' Dårlig' + ' | ' + strongIndex(countQOne[3]) + ' Veldig dårlig.'
        addAllContent(0, q1);

        let countQTwo = [0];
        counter(arr, 1, countQTwo);
        addAllContent(1, strongIndex(countQTwo))

        let countQThree = [0, 0, 0, 0, 0];
        counter(arr, 2, countQThree);
        const q3 = strongIndex(countQThree[0]) + " Logiskt oppsett | " + strongIndex(countQThree[1]) + ' Jeg Skjønte delvis | ' + strongIndex(countQThree[2]) + ' Jeg var usikker på hvor det startet | ' + strongIndex(countQThree[3]) + ' Jeg savnet følgende: kommentar boks'
        addAllContent(2, q3);

        let countQFour = [0, 0, 0, 0, 0];
        counter(arr, 3, countQFour);
        const q4 = strongIndex(countQFour[0]) + " Mer aktiviteter | " + strongIndex(countQFour[1]) + ' Flere spill | ' + strongIndex(countQFour[2]) + ' Mer historie | ' + strongIndex(countQFour[3]) + ' En guide | ' + strongIndex(countQFour[4]) + ' Mer informasjonsmatriell'
        addAllContent(3, q4)

        let countQFive = [0, 0, 0, 0, 0];
        counter(arr, 4, countQFive);
        const q5 = strongIndex(countQFive[0]) + " ja | " + strongIndex(countQFive[1]) + ' nei'
        addAllContent(4, q5)

        let countQSix = [0, 0, 0, 0, 0];
        counter(arr, 5, countQSix);
        const q6 = strongIndex(countQSix[0]) + " ... | " + strongIndex(countQSix[1]) + ' ...'
        addAllContent(5, q6)

        let countQSeven = [0, 0, 0 ,0, 0];
        counter(arr, 6, countQSeven);
        const q7 = strongIndex(countQSeven[0]) + " ... | " + strongIndex(countQSeven[1]) + ' ...'
        addAllContent(6, q7)

        let countQEight = [0, 0, 0 ,0, 0];
        counter(arr, 7, countQEight);
        const q8 = strongIndex(countQEight[0]) + " ... | " + strongIndex(countQEight[1]) + ' ...'
        addAllContent(7, q8)

        let countQNine = [0, 0, 0 ,0, 0];
        counter(arr, 8, countQNine);
        const q9 = strongIndex(countQNine[0]) + " ... | " + strongIndex(countQNine[1]) + ' ...'
        addAllContent(8, q9)

        let countQTen = [0, 0, 0 ,0, 0];
        counter(arr, 9, countQTen);
        const q10 = strongIndex(countQTen[0]) + " ... | " + strongIndex(countQTen[1]) + ' ...'
        addAllContent(9, q10)

        counting = false;
        goOffline(db)
    }
});


