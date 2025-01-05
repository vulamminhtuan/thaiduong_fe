import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "introduction": "THAI DUONG CAPITAL is an independent fund manager, incorporated in 2009, under a business license by State Securities Commission (SSC). The Company now is proving professional services in fund and portfolio management and investment advisory in Vietnam.",
            "button learn more": "Learn More",
            "search": "Search...",
            "search text": "Please enter characters.",
            "login": "Login",
            "list menu": {
                "1": "Home", 
                "2": "Our Firm", 
                "3": "Products & Services", 
                "4": "Resources", 
                "5": "Careers", 
                "6": "Contact Us"
            },
            "list our firm": {
                "1": "Overview", 
                "2": "Business Principles", 
                "3": "Our People", 
                "4": "Investor Relations", 
            },
            "list our resources": {
                "1": "Current Insight", 
                "2": "Investing Topic", 
                "3": "Supports", 
            },
            
                "product 1": "Fund Management", 
                "product 2": "Investment Managed Account", 
                "product 3": "Investment & Strategy Advisory", 
                "product 4": "Incidental Investment Services", 
            

            "about home": "About Thai Duong Capital",
            "about home content": "Founded in 2009, Thai Duong Capital has established itself as a trusted independent fund manager in Vietnam.",
            "experience": "Experience",
            "experience content": "Over a decade of experience in fund management and investment advisory services.",
            "expertise": "Expertise",
            "expertise content": "Deep understanding of Vietnamese markets and investment opportunities.",
            "trust": "Trust",
            "trust content": "Licensed by State Securities Commission (SSC) with a proven track record.",
            "Quick Links": "Quick Links",
            "Contact": "Contact",
            "address": "Unit 28-10, 28th Floor, Victory Tower, 12 Tan Trao, Tan Phu Ward, District 7, Ho Chi Minh City, Vietnam",
            "office location": "Office Location",
            "contact information": "Contact Information",
            "phone": "Phone",
            "legal": "Legal",
            "privacy policy": "Privacy Policy",
            "terms of use": "Terms of Use",
            "contact us content": "We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.",
            "full name": "Full name",
            "cell phone": "Cell phone",
            "home phone": "Home phone",
            "message": "Message",
            "send": "Send",
            "sending": "Sending",
            "resources content": "Join our team of investment professionals and be part of our journey to become the leading investment management firm in Vietnam.",
            "notification": "Please select an item to display",
            "register":"Register",
            "pass":"Password ",
            "text login":"Don't have an account?",
            "text register":"Already have an account?",
            "error email":"Invalid email",
            "error login 1":"Obligatory",
            "error pass":"Password must be at least 6 characters",
            "error login 2":"You have entered the wrong password or email.",
            "error login 3":"Server error ",
            "error login 4":"Connecting to the server failed. Please try again later.",
            "name":"Name",
            "name error":"Name cannot be blank",
            "name  error 2":"Name must be at least 2 characters",
            "error register 1":"Registration failed",
            "product":"Products & Services",
            
        }
    },
    vi: {
        translation: {
            "introduction": "THAI DUONG CAPITAL là công ty quản lý quỹ độc lập, được thành lập năm 2009 theo giấy phép kinh doanh của Ủy ban Chứng khoán Nhà nước (SSC). Công ty hiện đang cung cấp dịch vụ chuyên nghiệp trong quản lý quỹ, danh mục đầu tư và tư vấn đầu tư tại Việt Nam.",
            "button learn more": "Tìm hiểu thêm",
            "search": "Tìm kiếm...",
            "search text": "Vui lòng nhập ký tự.",
            "login": "Đăng nhập",
            "list menu": {
                1: "Trang chủ", 
                2: "Về chúng tôi", 
                3: "Sản phẩm & Dịch vụ", 
                4: "Tài nguyên", 
                5: "Tuyển dụng", 
                6: "Liên hệ"
            },
            "list our firm": {
                "1": "Tổng quan", 
                "2": "Nguyên tắc kinh doanh", 
                "3": "Người đứng đầu", 
                "4": "Quan hệ nhà đầu tư", 
            },
            "list our resources": {
                "1": "Cái nhìn sâu sắc", 
                "2": "Chủ đề đầu tư", 
                "3": "Hỗ trợ", 
            },
                "product 1": "Quản lý quỹ", 
                "product 2": "Tài khoản đầu tư được quản lý", 
                "product 3": "Tư vấn đầu tư và chiến lược", 
                "product 4": "Dịch vụ đầu tư ngẫu nhiên", 
            "about home": "Giới Thiệu Thai Duong Capital",
            "about home content": "Được thành lập vào năm 2009, Thai Duong Capital đã khẳng định mình là nhà quản lý quỹ độc lập đáng tin cậy tại Việt Nam.",
            "experience": "Kinh nghiệm",
            "experience content": "Hơn một thập kỷ kinh nghiệm trong lĩnh vực quản lý quỹ và tư vấn đầu tư.",
            "expertise": "Chuyên môn",
            "expertise content": "Hiểu biết sâu sắc về thị trường và cơ hội đầu tư Việt Nam.",
            "trust": "Tin tưởng",
            "trust content": "Được Ủy ban Chứng khoán Nhà nước (SSC) cấp phép với thành tích đã được chứng minh.",
            "Quick Links": "Liên kết nhanh",
            "Contact": "Liên hệ",
            "address": "28-10, tầng 28, Victory Tower, 12 Tân Trào, phường Tân Phú, Q.7, TP.HCM, Việt Nam",
            "office location": "Vị trí văn phòng",
            "contact information": "Thông tin liên hệ",
            "phone": "Điện thoại",
            "legal": "Hợp pháp",
            "privacy policy": "Chính sách bảo mật",
            "terms of use": "Điều khoản sử dụng",
            "contact us content": "Chúng tôi rất mong nhận được phản hồi từ bạn. Vui lòng điền vào mẫu dưới đây và chúng tôi sẽ phản hồi bạn sớm nhất có thể.",
            "full name": "Họ và tên",
            "cell phone": "Điện thoại di động",
            "home phone": "Điện thoại nhà",
            "message": "Tin nhắn",
            "send": "Gửi",
            "sending": "Đang gửi",
            "resources content": "Hãy tham gia đội ngũ chuyên gia đầu tư của chúng tôi và trở thành một phần trong hành trình trở thành công ty quản lý đầu tư hàng đầu tại Việt Nam.",
            "notification": "Vui lòng chọn mục để hiển thị",
            "register":"Đăng ký",
            "pass":"Mật khẩu",
            "text login":"Bạn chưa có tài khoản?",
            "text register":"Bạn đã có tài khoản?",
            "error email":"Email không hợp lệ",
            "error login 1":"Bắt buộc",
            "error pass":"Mật khẩu phải có ít nhất 6 ký tự",
            "error login 2":"Bạn đã nhập sai mật khẩu hoặc email",
            "error login 3":"Lỗi từ hệ thống ",
            "error login 4":"Lỗi kết nối",
            "name":"Tên",
            "name error":"Tên không được để trống",
            "name  error 2":"Tên phải có ít nhất 2 ký tự",
            "error register 1":"Đăng ký thất bại",
            "product":"Sản phẩm & Dịch vụ",
        }
    }
};

i18n
.use(initReactI18next)
.init({
    resources,
    lng: "en",
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;