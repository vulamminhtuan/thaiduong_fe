import axios from 'axios';
export const translateText = async () => {
    try {
        const response = await axios.post(
            'https://libretranslate.com/translate',
            {
                q: 'xin chào',
                source: 'auto',
                target: 'vi',
                format: 'text',
                alternatives: 3,
                api_key: '',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Translated Text:', response.data.translatedText);
        return response.data.translatedText; // Kết quả dịch
    } catch (error) {
        console.error('Error translating text:', error);
        throw error; // Xử lý lỗi nếu cần
    }
};