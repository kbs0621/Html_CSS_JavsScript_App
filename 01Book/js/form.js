//전역변수
const API_BASE_URL = "http://localhost:8080";

//DOM 엘리먼트 가져오기
const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

//Doucment Load 이벤트 처리하기
document.addEventListener("DOMContentLoaded", function () {
    LoadBooks();

});
//StudentForm의 Submit 이벤트 처리하기
bookForm.addEventListener("submit", function (event) {
    //기본적으로 설정된 Event가 동작하지 않도록 설정함
    event.preventDefault();
    console.log("Form이 제출 되었음 ...")

    //FormData 객체생성 <form> 엘리먼트를 객체로 변환
    const stuFormData = new FormData(bookForm);
    stuFormData.forEach((value, key) => {
        console.log(key + '=' + value);
    });

    //사용자 정의 Student Object Literal 객체생성(공백 제거 trim())
    const studentData = {
        title: stuFormData.get("title").trim(),
        author: stuFormData.get("author").trim(),
        isbn: stuFormData.get("isbn").trim(),
        price: stuFormData.get("price").trim(),
        publishDate: stuFormData.get("publishDate")

    }

});

//입력항목의 값의 유효성을 검증하는 함수
function validateBook(book){
    //title
    if (!book.title){
        alert("도서명을 입력해주세요.");
        return false;
    }

    //author
    if (!book.author){
        alert("저자명을 입력해주세요.");
        return false;
    }

    //Isbn 형식 검사
    const bookIsbnPattern = /d/;
    if (!bookIsbnPattern.test(book.isbn)){
        alert("isbn은 숫자만 입력가능합니다.");
        return false;
    }

    //price
    const bookPricePattern = /d/;
    if(!bookPricePattern.test(book.price)){
        alert("price는 숫자만 입력가능합니다.");
        return false;
    }

}

//Book(도서) 목록을 Load하는 함수

function LoadBooks() {
    console.log("도서 목록 Loading...");
    fetch(`${API_BASE_URL}/api/books`)
        .then(async (response) =>{
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.message}`);

            }
            return response.json();
        })
        .then((books) => renderBookTable(books))
        .catch((error) => {
            console.log(error);
        });

};

function renderBookTable(books) {
    console.log(books);
    bookTableBody.innerHTML = "";
    books.forEach((book) => {
        //<tr> 엘리먼트를 생성하기 <tr><td>홍길동</td><td>aaa</td></tr>
        const row = document.createElement("tr");

        //<tr>의 content을 동적으로 생성
        row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${book.price}</td>
                    <td>${book.publishDate}</td>
                `;
        //<tbody>의 아래에 <tr>을 추가시켜 준다.
        bookTableBody.appendChild(row);
    });
}//renderBookTable
