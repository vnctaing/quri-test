I had to create a small app that could help import massive upc-a codes. 

[UPC-A](https://en.wikipedia.org/wiki/Universal_Product_Code) is code convention to track product in retail store. It is composed of 11 digits and one digit check.

[Complete details](https://gist.github.com/chollier/277c67bf4c19cbebe54c)

## The requirements: 

- Live feedback
- Users should be able to easily spot a wrongly formatted UPC.
- It is not possible to submit UPCs until the list is clean.
- If an UPC is not valid, hints should be displayed.
- User should not be able to submit if there were wrong formatted UPC-A codes

## Get started

To launch the app :
```
npm i
npm start
```

To run the test :
```
npm test
```
