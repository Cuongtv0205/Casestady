function emailisValidate(email) {
    return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email);
}
function save() {
    let name = document.getElementById('name').value;
    let msv = document.getElementById('msv').value;
    let date = document.getElementById('ngaysinh').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('famale').checked) {
        gender = document.getElementById('famale').value
    }
    if (!isNaN(name)) { // trả về true hoặc False

        document.getElementById('name-error').innerHTML = 'Vui lòng nhập họ tên!';
    } else if (name.trim().length <= 2) {

        document.getElementById('name-error').innerHTML = 'Không được nhỏ hơn 2 ký tự!';
    } else if (name.trim().length > 50) {

        document.getElementById('name-error').innerHTML = 'Không được lớn hơn 50 ký tự!';
    } else {

        document.getElementById('name-error').innerHTML = '';
    }
    if (msv === '') {
        document.getElementById('msv-error').innerHTML = 'Vui lòng nhập mã sinh viên!';

    } else if (msv.trim().length > 6) {

        document.getElementById('msv-error').innerHTML = 'Bạn nhập mã sinh viên quá ký tự!';
    } else {
        document.getElementById('msv-error').innerHTML = '';
    }
    if (date === "") {
        document.getElementById('ng-error').innerHTML = 'Vui lòng nhập ngày sinh!';
    } else if (date.trim().length <= 2) {
        document.getElementById('ng-error').innerHTML = 'Bạn nhập ngày sinh không đúng!';
    } else if (date.trim().length > 10) {
        document.getElementById('ng-error').innerHTML = 'Bạn nhập quá ký tự!';
    } else {
        document.getElementById('ng-error').innerHTML = '';
    }
    if (!isNaN(email)) {

        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email!';

    } else if (!emailisValidate(email)) {

        document.getElementById('email-error').innerHTML = 'Vui lòng nhập đúng email!';
    } else {

        document.getElementById('email-error').innerHTML = '';
    }
    if (phone === "") {
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại!';

    } else if (phone.trim().length > 10) {

        document.getElementById('phone-error').innerHTML = 'Mời bạn nhập đúng số điện thoại!';
    } else {

        document.getElementById('phone-error').innerHTML = '';
    }
    if (!isNaN(address)) {

        document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ!';
    } else {

        document.getElementById('address-error').innerHTML = '';
    }
    if (gender === "") {

        document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính!';
    } else {

        document.getElementById('gender-error').innerHTML = '';
    }
// lưu vào trong danh sách sinh viên//
    if (name && msv && date && email && phone && address && gender) {
        //localStorage lấy dự liệu từ trong key? ,getItem là lấy dữ liệu ra//
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        // nếu mà nó rỗng gán bằng array,còn trái lại sẽ lấy ra kiểu parse gắn cho nó cái mảng rỗng//
        students.push({   // nếu có thì push thông tin sinh viên vào
            name: name,
            msv: msv,
            date: date,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });
        localStorage.setItem('students', JSON.stringify(students));
        // xong xét cái localstores ở trên là students ở trên, và chuyển đồi cái student.puss về kiểu string//
        this.renderListStudent(); // hàm hiển thỉ danh sách//
    }
    clear();
}

function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    if (students.length === 0) {
        // nếu cái mảng bằng 0 thì sẽ ẩn danh sách sinh viên, còn ngược lại thì hiển thị nó lên//
        document.getElementById('list-student').style.display = 'none';
        return false;
    }
    document.getElementById('list-student').style.display = 'block';
    let tableContent = `<tr>
    <td width="15px">STT</td>
    <td>Họ và Tên</td>
    <td>Mã Sinh Viên</td>
    <td>Ngày Sinh</td>
    <td>Email</td>
    <td>Điện Thoại</td>
    <td>Giới Tính</td>
    <td>Địa Chỉ</td>
    <td>Hành Động</td>
  </tr>`;
    students.forEach((student, index) => { // gọi hàm cho mỗi phần tử trong mảng//
        // id của mảng bd xóa bắt đầu bằng 0//
        let studentId = index; // index là key của mảng students// được truyền vào sự kiện onclick của delete//
        let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
        // nếu student.gerden ===1 thì là nam, trái lại thì là  Nữ//
        index++; // mỗi lẫn chạy xong + lên 1 đơn vị//
        tableContent += `<tr>
     <td>${index}</td>
    <td>${student.name}</td>  
    <td>${student.msv}</td>
     <td>${student.date}</td>
     <td>${student.email}</td>
     <td>${student.phone}</td>
     <td>${genderLabel}</td>
     <td>${student.address}</td>
     <td>
     <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
 </td>
   </tr>`;
    })
    document.getElementById('grid-students').innerHTML = tableContent;
}
function deleteStudent(id) {
    // mỗi lần xóa sẽ đọc thông tin sinh viên//
    //trong mảng key của students không trùng nhau nên dựa vào đó để xóa//(id)
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1); // xóa phần tử id có key là bao nhiêu, và xóa đi bao nhiêu phần tử//
    localStorage.setItem('students', JSON.stringify(students)); // push lại vào
    renderListStudent(); // hiển thi lại//
}

function clear() {
    document.getElementById('name').value = '';
    document.getElementById('msv').value = '';
    document.getElementById('ngaysinh').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById("male").checked = false;
    document.getElementById("famale").checked = false;

}