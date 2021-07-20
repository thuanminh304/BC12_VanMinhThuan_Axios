function DanhSachNguoiDung() {
  this.layDSND = function () {
    //GET: Lấy dữ liệu từ sever
    // Axios sẽ trả về 1 promise
    return axios({
      url: "https://60d5dbfe943aa60017768c66.mockapi.io/people",
      method: "GET",
    });
  };

  this.themNguoiDung = (nd) => {
    return axios({
      url: "https://60d5dbfe943aa60017768c66.mockapi.io/people",
      method: "POST",
      data: nd,
    });
  };

  this.xoaNguoiDung = (id) => {
    return axios({
      url: `https://60d5dbfe943aa60017768c66.mockapi.io/people/${id}`,
      method: "DELETE",
    });
  };

  this.xemNguoiDung = (id) => {
    return axios({
      url: `https://60d5dbfe943aa60017768c66.mockapi.io/people/${id}`,
      method: "GET",
    });
  };

  this.capNhatNguoiDung = (id, nd) => {
    return axios({
      url: `https://60d5dbfe943aa60017768c66.mockapi.io/people/${id}`,
      method: "PUT",
      data: nd,
    });
  };

  this.timNguoiDung = (dsnd, chuoiTK) => {
    return dsnd.filter((sp) => {
      return sp.hoTen.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
    });
  };
}
