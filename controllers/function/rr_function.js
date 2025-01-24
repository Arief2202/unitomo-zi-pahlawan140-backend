// fungsi untuk memberikan respon ketika proses sukses
rs = (res, data) => {
return res.status(200).json({
    status: 'ok',
    data: data
});
};

// fungsi untuk memberikan respon ketika proses gagal
re = (res, err, code, action = '') => {
    if(!code) err_code = 500;
    else err_code = code;
    if(action) err = action;
    return res.status(err_code).json({
        status: 'error',
        error: err
    });
};

// export semua fungsi diatas
module.exports = {rs, re};