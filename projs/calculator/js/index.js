$(document).ready(() => {

    var expression = ["0"]
    var result = ""
    var buttonPressed = null

    $("#dashSecondary").text(expression.join(""))
    $("#dashPrimary").text(computeExpression(expression))



    // Get button clicked
    $(".btn").on("click", function () {
        buttonPressed = $(this).text()

        switch (buttonPressed) {
            case "AC":
                // Secondary dash
                expression = ["0"]
                updateSecondaryDash(expression)

                // Primary dash
                updatePrimaryDash("0")
                break

            case "CE":
                // Secondary dash
                if (expression.length > 1) {
                    expression.pop()
                } else if (expression.length == 1) {
                    expression = ["0"]
                }
                updateSecondaryDash(expression)

                // Primary dash
                result = computeExpression(expression)
                updatePrimaryDash(result)
                break

            case "*":
            case "/":
            case "+":
            case "-": {
                if (expression.length > 30) {
                    return
                }

                let last = expression[expression.length - 1]
                if (["+", "-", "*", "/"].indexOf(last) == -1) {
                    expression.push(buttonPressed)
                } else {
                    expression[expression.length - 1] = buttonPressed
                }
                updateSecondaryDash(expression)
                break
            }
            case ".": {
                if (expression.length > 30) {
                    return
                }
                if (expression.indexOf(".") > -1) {
                    return
                }

                let last = expression[expression.length - 1]
                if (last != ".") {
                    expression.push(".")
                }
                updateSecondaryDash(expression)
                break
            }
            case "=":
                break
            default:
                if (expression.length > 30) {
                    return
                }

                if (expression.length == 1 && expression[0] == 0) {
                    expression[0] = buttonPressed
                } else {
                    expression.push(buttonPressed)
                }
                updateSecondaryDash(expression)
                updatePrimaryDash(computeExpression(expression))
                break
        }
    })
})


function updateSecondaryDash(expr) {
    $("#dashSecondary").text(expr.join(""))
}

function updatePrimaryDash(res) {
    $("#dashPrimary").text(res)
}

function computeExpression(expr) {
    let res = null
    let last = expr[expr.length - 1]
    let newExpr = expr.slice()
    if (["+", "-", "*", "/"].indexOf(last) > -1) {
        newExpr.pop()
    }

    res = eval(newExpr.join(""))

    return res
}
