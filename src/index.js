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
const reloadBtn = document.getElementById('reload-btn');
//"fetch data"
reloadBtn.addEventListener('click', () => {
    location.reload();
})

// Important variables
let arr = [];
let count = {};
let counting = true;
let isTru;
let isTruYes;
let isTruNo;
let isTruYesNo;
let isTruNoYes;

function strongIndex(string) {
    return '<strong>' + string + '</strong>'
}

function addContent(el0, content) {
    el0.innerHTML = "<p class='data font-size'>" + content; + "</p>"
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

    //display data    
    count.answer == undefined ? isTru = 0 : isTru = count.answer;
    const numOfAns = strongIndex(isTru) +  ' - ' +' spillere😁'
    addContent(el, numOfAns);

    [count["1,1"]] == false ? isTruYes = 0 : isTruYes = [count["1,1"]];
    const yesBoth = strongIndex(isTruYes) + ' - ' + ' har svart "bra", og "ja"!❤️'
    addContent(el2, yesBoth);

    [count["2,2"]] == false ? isTruNo = 0 : isTruNo = [count["2,2"]];
    const noBoth = strongIndex(isTruNo) + ' - ' + ' har svart "dårlig", og "nei"🤷🏻‍♂️'
    addContent(el3, noBoth);

    [count["1,2"]] == false ? isTruYesNo = 0 : isTruYesNo = [count["1,2"]];
    const yesSome = strongIndex(isTruYesNo) + ' - ' + ' har svart "bra", og "nei"🤷🏻‍♂️'
    addContent(el4, yesSome);

    [count["2,1"]] == false ? isTruNoYes = 0 : isTruNoYes = [count["2,1"]];
    const noSome = strongIndex(isTruNoYes) + ' - ' + ' har svart "dårlig" og "ja"👎🏻'
    addContent(el5, noSome);

});


