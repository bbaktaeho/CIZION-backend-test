const bandedWords = ["씨발", "취업 실패", "아쉽지만", "다음 기회에"];
const regExp = new RegExp("(" + bandedWords.join("|") + ")", "g");

export function replaceBandedWord(str: string) {
  return str.replace(regExp, "****");
}
