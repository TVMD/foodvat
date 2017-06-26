# foodgo
Docs API

    128.199.85.232:3000

1/Đăng nhập (chỉ bằng facebook), hình thức thôi

    /login

Post, truyền vào body :

      id_fb: userObject.id_fb,
      
      name: userObject.name,
      
      birthday: userObject.birthday,
      
      gender: userObject.gender,
      
      avatar: userObject.avatar,
      
      email: userObject.email,
      
      created: Date.now()
      
Trả về {login_status : true} nếu có trong database, hoặc chưa có thì tạo mới

false nếu tìm kiếm trong database thất bại

2/load quán :

    /places/get_list

Get, ko tham số, 

-	Dùng cho việc load quán trên bản đồ (có thuộc tính location lưu 2 biến vĩ độ (lat) - kinh độ (long): location:{lat:xxx, long:yyy}

-	Dùng load theo dạng list, sort theo khoảng cách từ hiện tại tới quán (tính toán và sort ở client nhé) :v

3/tìm kiếm : theo tên quán, hoặc theo món ăn

    /places/get_list_search/:keyword

Get, truyền tham số keyword ở link

4/random 1 quán : dùng cho chức năng *

(*) chức năng này là : vừa đăng nhập xong, vào app, hiển thị lên 1 cái dialog(chả biết phải ko :3) : “Hãy để tôi gợi ý cho bạn nhé” rồi cho chọn “Ăn” hoặc “Uống”. chọn xong sẽ hiển thị ra thông tin quán, nếu ng dùng ko thích có thể chọn random tiếp :v

    /places/get_random_food

    /places/get_random_drink

5/ load list ảnh : 

    /places/list_image/:id_place
    
  Hàm get, truyền các tham số id_place
  
  Trả về danh sách image goồm tên hình, comment, .... Để get hình, gắn thêm link trước tên hình : "foodvat.herokuapp.com/uploads/" + ten_hinh
  
6/ Up hình ảnh :
    
    /places/post_image
    
  Hàm post, gồm hình và các tham số : 
  
    id_place:imageObject.id_place,
    
    id_user:imageObject.id_user,
    
    name_user:imageObject.name_user,
    
    review:imageObject.review,
    
    create: Date.now()    

Nếu thành công, trả về "success"
  
  
    

