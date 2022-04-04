import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


//@desc Auth user & get tokents, POST /api/users/login, Public Route
const authUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})


//Register a new user, POST /api/users/register, Public Route
const registerUser = asyncHandler(async(req, res) => {

    const { email, password, name } = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){

        res.status(201).json({
             _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

        
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})




//@desc Auth user profile , GET /api/users/profile, Private Route
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    console.log('USER',user)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

//@desc Update user profile , PUT /api/users/profile, Private Route
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    //console.log('USER',user)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.user.password ) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })


    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


//@desc GET all users , GET /api/users, Private Route
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()

    res.json(users)
    

})

//@desc DELETE user , DELETE /api/users/:id, Private/Admin Route
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)


    if(user){
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    
    

})


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


export { authUser, getUserProfile,registerUser, updateUserProfile, getUsers, deleteUser , getUserById, updateUser }


