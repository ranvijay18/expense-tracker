const form = document.getElementById('form');
const list = document.getElementById('expense');
form.addEventListener('submit', store);


window.addEventListener('DOMContentLoaded' , () => {

    axios.get('http://localhost:5000/expense')
    .then((res) => {
      const data = res.data;
  
      data.forEach(ele => {
        showData(ele);
      });
      
    })
    
  });



function store(e){
    e.preventDefault();

    const amount = e.target.amount.value;
    const des = e.target.des.value;
    const cat = e.target.cat.value;


    const obj = {
        amount,
        des,
        cat
    }

    axios.post('http://localhost:5000/expense', obj)
    .then(res => {
        const data = res.data.newDetails;
        console.log(data);
        showData(data);
    })
}


showData = (res) => {

    var ul = document.createElement('ul');

    var li = document.createElement('li');
    li.className = "head-amount";
    var details = res['amount'];
    li.appendChild(document.createTextNode(details));
    ul.appendChild(li);
    var li = document.createElement('li');
    li.className = "head-des";
    var details = res['description']
    li.appendChild(document.createTextNode(details));
    ul.appendChild(li);
    var li = document.createElement('li');
    li.className = "head-cat";
    var details = res['category'];
    li.appendChild(document.createTextNode(details));
    ul.appendChild(li);

    var editBtn = document.createElement('button');
    editBtn.id = `${res.id}`;
    editBtn.className = "edit btn btn-outline-success";
    editBtn.appendChild(document.createTextNode("Edit"));
    ul.appendChild(editBtn);

    var deleteBtn = document.createElement('button');
    deleteBtn.id = `${res.id}`;
    deleteBtn.className = "del btn btn-outline-danger";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    ul.appendChild(deleteBtn);

    list.appendChild(ul);

    editBtn.addEventListener('click' , (e) => {
      console.log(e.target.id);
      const expenseId = e.target.id;

      list.removeChild(ul);

      axios.get('http://localhost:5000/expense/edit/'+ expenseId)
      .then((res) => {
        const editExpense = res.data.editExpense;
     console.log(editExpense);
        document.getElementById('amount').value = editExpense['amount'];
        document.getElementById('des').value = editExpense['description'];
        document.getElementById('cat').value = editExpense['category'];


      })
    })


    deleteBtn.addEventListener('click' , (e) => {
      const expenseId = e.target.id;

      list.removeChild(ul);

      axios.get('http://localhost:5000/expense/delete/'+expenseId)
      .then(() => {
         console.log("Expense Data Deleted!!");
      })
      .catch(err => {
        console.log(err);
      })
    })

} 
