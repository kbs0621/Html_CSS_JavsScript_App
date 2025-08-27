//전역변수
const API_BASE_URL = "http://localhost:8085";

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


//Book(도서) 목록을 Load하는 함수

function LoadBooks() {
    console.log("도서 목록 Loading...")

}
