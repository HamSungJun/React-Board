let USERNAME_REGEX = /^[가-힣a-zA-Z0-9\_\-]{2,12}$/


let result = USERNAME_REGEX.test("함성준123")

console.log(result)