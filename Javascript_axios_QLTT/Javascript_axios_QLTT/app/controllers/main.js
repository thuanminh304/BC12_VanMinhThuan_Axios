var danhSachNguoiDung = new DanhSachNguoiDung();

function getEle(id) {
  return document.getElementById(id);
}
//lấy danh sach người dùng
var layDanhSachNguoiDung = function () {
  danhSachNguoiDung
    .layDSND()
    .then(function (result) {
      renderTable(result.data);
      setLocalStorage(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
layDanhSachNguoiDung();

// renderTable : bước đầu

function renderTable(mangND) {
  var content = "";
  mangND.map(function (nd, index) {
    content += `
        <tr>
                <td>${index + 1}</td>
                <td>${nd.taiKhoan}</td>
                <td>${nd.matKhau}</td>
                <td>${nd.hoTen}</td>
                <td>${nd.email}</td>
                <td>${nd.ngonNgu}</td>
                <td>${nd.loaiND}</td>
                <td>
                    <button class="btn btn-success" onclick="xemNguoiDung('${
                      nd.id
                    }')" >Xem</button>
                    <button class="btn btn-danger" onclick="xoaNguoiDung('${
                      nd.id
                    }')" >Xóa</button>
                </td>
        
        
        </tr>
        
        `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

function setLocalStorage(dsnd) {
  localStorage.setItem("DSND", JSON.stringify(dsnd));
}

function getLocalStorage() {
  if (localStorage.getItem("DSND")) {
    return JSON.parse(localStorage.getItem("DSND"));
  }
}

xoaNguoiDung = (id) => {
  danhSachNguoiDung
    .xoaNguoiDung(id)
    .then(function (result) {
      layDanhSachNguoiDung();
    })
    .catch(function (error) {
      console.log(error);
    });
};

getEle("btnThemNguoiDung").addEventListener("click", () => {
  document.querySelector(".modal-footer").style.display = "block";
  document.querySelector(".modal-footer").innerHTML = `
<button class=" btn btn-success" onclick="themNguoiDung()">Thêm</button>
`;
  getEle("formModal").reset();
});

themNguoiDung = () => {
  // lấy thong tin người dùng nhập vào
  const taiKhoan = getEle("TaiKhoan").value;
  const hoTen = getEle("HoTen").value;
  const matKhau = getEle("MatKhau").value;
  const email = getEle("Email").value;
  const hinhAnh = getEle("HinhAnh").value;
  const loaiND = getEle("loaiNguoiDung").value;
  const ngonNgu = getEle("loaiNgonNgu").value;
  const moTa = getEle("MoTa").value;

  // kiểm tra validatorr

  const validator = new Validator();

  _kiemTraRong = (value, spanID, mess) => {
    if (!value) {
      getEle(spanID).style.display = "block";
      getEle(spanID).style.color = "red";

      getEle(spanID).innerHTML = "(*)Không được để trống";
      return false;
    }

    getEle(spanID).style.display = "none";
    getEle(spanID).innerHTML = "";
    return true;
  };

  var isValid = true;
  //tài khoản
  isValid &= validator.kiemTraRong(_kiemTraRong(taiKhoan, "tbTK"));
  //họ tên
  isValid &=
    validator.kiemTraRong(_kiemTraRong(hoTen, "tbTen")) &&
    validator.kiemTraChuoi(
      hoTen,
      "tbTen",
      "(*)Không chứa số và ký tự đặt biệt"
    );
  //mật khẩu

  isValid &= validator.kiemTraMK(
    matKhau,
    "tbMK",
    "(*)Không được để trống, có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và có độ dài từ 6-8 ký tự"
  );
  //email
  isValid &= validator.kiemTraEmail(
    email,
    "tbEmail",
    "(*)Vui lòng nhập đúng định dạng Email, abcdef@gmail.com !"
  );
  //hình ảnh
  isValid &= validator.kiemTraRong(_kiemTraRong(hinhAnh, "tbHinh"));
  // loại nd
  isValid &= validator.kiemTraSelect("loaiNguoiDung","tbLoaiND", "Vui lòng chọn chức vụ !");
//loai ngon ngu
isValid &= validator.kiemTraSelect("loaiNgonNgu","tbNN","Vui lòng chọn ngôn ngữ !")
  //mô tả
  isValid &= validator.kiemTraMoTa(
    moTa,
    "tbMT",
    "(*)Không được để trống và không vượt quá 60 ký tự"
  );
  if (!isValid) return;

  const nguoiDung = new NguoiDung(
    taiKhoan,
    matKhau,
    hoTen,
    email,
    ngonNgu,
    loaiND
  );
  danhSachNguoiDung
    .themNguoiDung(nguoiDung)
    .then(function (result) {
      layDanhSachNguoiDung();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/// xem người dùng để chỉnh sửa

xemNguoiDung = (id) => {
  getEle("btnThemNguoiDung").click();

  danhSachNguoiDung
    .xemNguoiDung(id)
    .then(function (result) {
      const nguoidungmoi = result.data;

      getEle("TaiKhoan").value = nguoidungmoi.taiKhoan;
      getEle("HoTen").value = nguoidungmoi.hoTen;
      getEle("MatKhau").value = nguoidungmoi.matKhau;
      getEle("Email").value = nguoidungmoi.email;
      getEle("HinhAnh").value = nguoidungmoi.hinhAnh;
      getEle("loaiNguoiDung").value = nguoidungmoi.loaiND;
      getEle("loaiNgonNgu").value = nguoidungmoi.ngonNgu;
      getEle("MoTa").value = nguoidungmoi.moTa;

      document.querySelector(".modal-footer").innerHTML = `
<button class=" btn btn-success" onclick="capNhatNguoiDung('${nguoidungmoi.id}')">Cập Nhật</button>`;
    })
    .catch(function (error) {
      console.log(error);
    });
};

capNhatNguoiDung = (id) => {
  const taiKhoan = getEle("TaiKhoan").value;
  const hoTen = getEle("HoTen").value;
  const matKhau = getEle("MatKhau").value;
  const email = getEle("Email").value;
  const hinhAnh = getEle("HinhAnh").value;
  const loaiND = getEle("loaiNguoiDung").value;
  const ngonNgu = getEle("loaiNgonNgu").value;
  const moTa = getEle("MoTa").value;

  const nguoiDungSauCapNhat = new NguoiDung(
    taiKhoan,
    matKhau,
    hoTen,
    email,
    ngonNgu,
    loaiND
  );

  console.log(nguoiDungSauCapNhat);
  danhSachNguoiDung
    .capNhatNguoiDung(id, nguoiDungSauCapNhat)
    .then(function (result) {
      layDanhSachNguoiDung();
    })
    .catch(function (error) {
      console.log(error);
    });
};

getEle("basic-addon2").addEventListener("click", () => {
  const chuoiTK = getEle("timKiem").value;
  const mangND = getLocalStorage();
  
  const mangTK = danhSachNguoiDung.timNguoiDung(mangND, chuoiTK);

  renderTable(mangTK);
});
