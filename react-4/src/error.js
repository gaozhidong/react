export default function errorInfo(error) {
    switch (error.code) {
        default:
            alert(error)
            break
        case 200:
            alert('用户名不能为空')
            break
        case 201:
            alert('密码不能为空')
            break
        case 202:
            alert('用户名已被注册')
            break
        case 208:
            alert('用户名已登录')
            break
        case 210:
            alert('用户名和密码不匹配')
            break
        case 211:
            alert('找不到该用户')
            break
        case 218:
            alert('无效的密码，不允许空白密码')
            break
        case 219:
            alert('登录失败次数超过限制，请稍候再试')
            break

    }
}