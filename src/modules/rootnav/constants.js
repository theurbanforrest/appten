// @flow

//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'rootnav'

//action types
//export const INCREMENT = `${NAME}/INCREMENT`
//export const DECREMENT = `${NAME}/DECREMENT`
//export const ADD_NEW_COUNTER = `${NAME}/NEW`

//as you can see above, each action is namespaced with module's name.


//added by forrest
export const PRINT_SELF = `{NAME}/PRINT_SELF`