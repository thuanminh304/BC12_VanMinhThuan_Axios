function Validator() {
  //check tên người dùng (k trống k trùng )

  this.kiemTraRong = (_kiemTraRong) => {
    // if (!value) {
    //   getEle(spanID).style.display = "block";
    //   getEle(spanID).style.color = "red";
    //   getEle(spanID).innerHTML = mess;
    //   return false;
    // }
    // getEle(spanID).style.display = "none";
    // getEle(spanID).innerHTML = "";
    // return true;
  };

  this.kiemTraTrungNhau = (value, spanID, mess) => {};

  this.kiemTraChuoi = (value, spanId, mess) => {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

    if (pattern.test(value)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  };

  this.kiemTraMK = (value, spanID, mess) => {
    const pattern = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/
    );

    if (pattern.test(value)) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).style.color = "red";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  this.kiemTraEmail = (value, spanID, mess) => {
    const pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com*$/);
    if (pattern.test(value)) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).style.color = "red";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  this.kiemTraMoTa = (value, spanID, mess) => {
    const pattern = new RegExp(/^.{1,60}$/);
    if (pattern.test(value)) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).style.color = "red";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  this.kiemTraSelect = (id,spanID, mess) => {
    const theSelect = getEle(id);
    if (theSelect.selectedIndex == 0) {
      getEle(spanID).style.display = "block";
      getEle(spanID).style.color = "red";
      getEle(spanID).innerHTML = mess;
      return false;
    }

    getEle(spanID).style.display = "none";
    getEle(spanID).innerHTML = "";
    return true;
  };
}
