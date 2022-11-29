// input: string to validate
// output: returns number in cents if input is valid, returns undefined otherwise
// string is considered invalid if it is not formatted as "$x", "$x.x", or "$x.xx"
function validateAmount(input)
{
    const reg = /^\$?(\d+)(?:\.(\d{1,2}))?$/;
    const match = reg.exec(input);

    if(match)
    {
        let dollars = Number(match[1]) * 100;

        if (match[2])
        {
            if(match[2].length === 1)
            {
                let cents = Number(match[2]) * 10;
                return dollars + cents;
            }
            else
            {
                let cents = Number(match[2]);
                return dollars + cents;
            }
        }

        return dollars;
    }
    else
    {
        return undefined;
    }
}

// input:  id of the input number element
// target: id of the text body element to print to
function makeChange(input, target)
{
    let result = "Your change is ";
    let remaining = validateAmount(document.getElementById(input).value);

    if (remaining)
    {
        let [quarters, dimes, nickels, pennies] = [0, 0, 0, 0];
        
        while (quarters < Math.floor(remaining / 25))
        {
            quarters += 1;
        }
        remaining -= (quarters * 25);

        while (dimes < Math.floor(remaining / 10))
        {
            dimes += 1;
        }
        remaining -= (dimes * 10);

        while (nickels < Math.floor(remaining / 5))
        {
            nickels += 1;
        }
        remaining -= (nickels * 5);
        pennies = remaining;

        if (quarters > 0)
        {
            if (quarters === 1)
            {
                result += quarters + " quarter";
            }
            else
            {
                result += quarters + " quarters";
            }
        }

        if(dimes > 0)
        {
            if (quarters > 0 && (nickels + pennies) > 0)
            {
                result += (", ");
            }
            else if (quarters > 0 && (nickels + pennies === 0))
            {
                result += (" and ");
            }

            if (dimes > 1)
            {
                result += dimes + " dimes";
            }
            else
            {
                result += dimes + " dime";
            }
        }
        
        if(nickels > 0)
        {
            if((quarters + dimes) > 0 && pennies > 0)
            {
                result += (", ");
            }
            else if ((quarters + dimes) > 0 && pennies === 0)
            {
                result += (" and ");
            }

            if(nickels > 1)
            {
                result += nickels + " nickels";
            }
            else
            {
                result += nickels + " nickel";
            }
        }

        if(pennies > 0)
        {
            if((quarters + nickels + dimes) > 0)
            {
                result += (" and ");
            }

            if(pennies > 1)
            {
                result += pennies + " pennies";
            }
            else
            {
                result += pennies + " penny";
            }
        }
        result += ".";
    }
    else
    {
        result = "Please insert a valid amount.";
    }

    document.getElementById(target).innerHTML = result;
}
