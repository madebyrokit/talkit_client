export const validators = {
    id: (id) => /^[A-Za-z0-9]{6,20}$/.test(id),
    pw: (pw) => /^[A-Za-z0-9]{8,20}$/.test(pw),
    email: (email) =>
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(
            email
        ),
    pwConfirm: (pw, pwConfirm) => pw === pwConfirm,
    mbti: (mbti) => /^[INFJESTP][NS][FT][JP]$/.test(mbti),
    birthdate: (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate <= today;
    },
};

export const errorMessages = {
    id: "아이디는 6글자 이상의 영문과 숫자 조합으로 가능합니다.",
    pw: "비밀번호는 8글자 이상의 영문과 숫자 조합으로 가능합니다.",
    email: "올바른 이메일 형식이 아닙니다.",
    birthdate: "미래 날짜는 선택할 수 없습니다.",
    pwConfirm: "비밀번호가 일치하지 않습니다.",
    mbti: "올바른 MBTI 형식을 입력해주세요.",
};

export const MBTI_TYPES = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];