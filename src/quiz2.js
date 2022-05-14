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
const el11= document.getElementById('data11');
const el12 = document.getElementById('data12');
const el13 = document.getElementById('data13');
const reloadBtn = document.getElementById('reload-btn');

reloadBtn.addEventListener('click', () => {
    location.reload();
})

// Important variables
let arr = [];
let count = {};
let counting = true;

function strongIndex(string) {
    return '<strong>' + string + '</strong>'
}

function addContent(el0, content) {
    el0.innerHTML = "<p class='data font-size'>" + content; + "</p>"
}

const db = getDatabase();
//getting the first node in the database
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
                arr.push(Key, childData);
            })
        })
    })

    //counts all the answers that match, and returns them to the count object
    if (counting == true) {
        count = arr.reduce((accumulator, value) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
        }, {})
        counting = false;
    } 
})