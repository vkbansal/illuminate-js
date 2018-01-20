export const apacheconf: string = `
<VirtualHost *:80>
    ServerAdmin webmaster@localhost

    DocumentRoot /var/www
    <Directory />
            Options FollowSymLinks
            AllowOverride None
    </Directory>
    <Directory /var/www/>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride None
            Order allow,deny
            allow from all
    </Directory>
</VirtualHost>
`;

export let bash: string = `
#!/bin/bash

if test -s $1
then
    echo "$1 not empty file"
fi

if test -f $1
then
    echo "$1 normal file. Not a directory"
fi

if test -e $1
then
    echo "$1 exists"
fi

if test -d $1
then
    echo "$1 is directory and not a file"
fi

if test -r $1
then
    echo "$1 is read-only file"
fi

if test -x $1
then
    echo "$1 is executable"
fi
`;

export let css: string = `
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

// export const diff: string = ``;

export const haskell: string = `
primes = filterPrime [2..]
  where filterPrime (p:xs) =
          p : filterPrime [x | x <- xs, x \`mod\` p /= 0]
`;

export const http: string = `
GET /users/vkbansal/repos HTTP/1.1
Host: api.github.com
Content-Type: application/json
Accept: application/json
`;

export const ini: string = `
; any text on a line after an unquoted semicolon (;) is ignored
[php]
; Boolean values can be set to either:
;    true, on, yes
; or false, off, no, none
register_globals = off
track_errors = yes

; you can enclose strings in double-quotes
include_path = ".:/usr/local/lib/php"

; backslashes are treated the same as any other character
include_path = ".;c:\\php\\lib"
`;

export const json: string = `
{
    "colors": [
        {
            "color": "black",
            "category": "hue",
            "type": "primary",
            "code": {
                "rgba": [255, 255, 255, 1],
                "hex": "#000"
            }
        },
        {
            "color": "white",
            "category": "value",
            "code": {
                "rgba": [0, 0, 0, 1],
                "hex": "#FFF"
            }
        },
        {
            "color": "red",
            "category": "hue",
            "type": "primary",
            "code": {
                "rgba": [255, 0, 0, 1],
                "hex": "#FF0"
            }
        },
        {
            "color": "blue",
            "category": "hue",
            "type": "primary",
            "code": {
                "rgba": [0, 0, 255, 1],
                "hex": "#00F"
            }
        },
        {
            "color": "yellow",
            "category": "hue",
            "type": "primary",
            "code": {
                "rgba": [255, 255, 0, 1],
                "hex": "#FF0"
            }
        },
        {
            "color": "green",
            "category": "hue",
            "type": "secondary",
            "code": {
                "rgba": [0, 255, 0, 1],
                "hex": "#0F0"
            }
        }
    ]
}
`;

export const less: string = `
@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}

.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}

.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}
`;

export const makefile: string = `
edit: main.o kbd.o command.o display.o
    cc -o edit main.o kbd.o command.o display.o

main.o: main.c defs.h
    cc -c main.c
kbd.o: kbd.c defs.h command.h
    cc -c kbd.c
command.o: command.c defs.h command.h
    cc -c command.c
display.o: display.c defs.h
    cc -c display.c

clean:
    rm edit main.o kbd.o command.o display.o
`;

export const markup: string = `
<div>
    Hello world!
</div>
`;

export let javascript: string = `
import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
    handleClick = () => {
        this.props.increment(this.props.incrementValue);
    }

	render() {
        return (
            <button
                onClick={this.handleClick}>
                +{this.props.incrementValue}
            </button>
        )
    }
}

const Result = (props) => {
    return (
        <div>{props.counter}</div>
    )
}

class App extends React.Component {
	// initialize the state of the counter
	state = {
    	counter: 0
    }
    increment = (value) => {
        this.setState((prevState) => {
            return {counter: prevState.counter + value}
        });
    }
    render() {
        return (
            <div>
                <Button incrementValue={1} increment={this.increment} />
                <Button incrementValue={2} increment={this.increment} />
                <Button incrementValue={100} increment={this.increment} />
                <Button incrementValue={1000} increment={this.increment} />
                <Result counter={this.state.counter} />
            </div>
        )
    }
}

// change the mountNode if you run this example in other environments
ReactDOM.render(<App />, mountNode);
`;

export let matlab: string = `
x = 0:pi/100:2*pi;
y = sin(x);
plot(x, y)
xLabel('x')
yLabel('sin(x)')
title('Plot of Sine function')
`;

export let php: string = `
<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $name = $request->input('name');

        //
    }
}
`;

export let python: string = `
# Python program to find the factorial of a number using recursion

def recur_factorial(n):
   """Function to return the factorial
   of a number using recursion"""
   if n == 1:
       return n
   else:
       return n*recur_factorial(n-1)

# Change this value for a different result
num = 7

# uncomment to take input from the user
#num = int(input("Enter a number: "))

# check is the number is negative
if num < 0:
   print("Sorry, factorial does not exist for negative numbers")
elif num == 0:
   print("The factorial of 0 is 1")
else:
   print("The factorial of",num,"is",recur_factorial(num))
`;

export let ruby: string = `
# Output "I love Ruby"
say = "I love Ruby"
puts say

# Output "I *LOVE* RUBY"
say['love'] = "*love*"
puts say.upcase

# Output "I *love* Ruby"
# five times
5.times { puts say }
`;

export let scss: string = `
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
       -moz-border-radius: $radius;
        -ms-border-radius: $radius;
            border-radius: $radius;
}

.box { @include border-radius(10px); }
`;

export let sql: string = `
SELECT
    first_name, last_name
FROM
    customers
WHERE
    customers.active IS true;
`;

export let typescript: string = `
import * as React from "react";
import * as ReactDOM from 'react-dom';

interface ButtonProps {
    incrementValue: number;
    increment: (i: number) => void;
}

class Button extends React.Component<ButtonProps> {
    handleClick = () => {
        this.props.increment(this.props.incrementValue);
    }

	render() {
        return (
            <button
                onClick={this.handleClick}>
                +{this.props.incrementValue}
            </button>
        )
    }
}

interface ResultProps {
    counter: number;
}

const Result = (props: ResultProps) => {
    return (
        <div>{props.counter}</div>
    )
}

interface AppState {
    counter: number;
}

class App extends React.Component<{}, AppState> {
	// initialize the state of the counter
	state = {
    	counter: 0
    }

    increment = (value) => {
        this.setState((prevState: AppState) => {
            return {counter: prevState.counter + value}
        });
    }

    render() {
        return (
            <div>
                <Button incrementValue={1} increment={this.increment} />
                <Button incrementValue={2} increment={this.increment} />
                <Button incrementValue={100} increment={this.increment} />
                <Button incrementValue={1000} increment={this.increment} />
                <Result counter={this.state.counter} />
            </div>
        )
    }
}

// change the mountNode if you run this example in other environments
ReactDOM.render(<App />, mountNode);
`;

export const yaml: string = `
---
receipt:     Oz-Ware Purchase Invoice
date:        2012-08-06
customer:
    first_name:   Dorothy
    family_name:  Gale

items:
    - part_no:   A4786
      descrip:   Water Bucket (Filled)
      price:     1.47
      quantity:  4

    - part_no:   E1628
      descrip:   High Heeled "Ruby" Slippers
      size:      8
      price:     133.7
      quantity:  1

bill-to:  &id001
    street: |
            123 Tornado Alley
            Suite 16
    city:   East Centerville
    state:  KS

ship-to:  *id001

specialDelivery:  >
    Follow the Yellow Brick
    Road to the Emerald City.
    Pay no attention to the
    man behind the curtain.
`;
