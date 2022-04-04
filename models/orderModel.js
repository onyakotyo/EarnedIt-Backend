import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    senderEmail: {
      type: String,
      //required: true,
      unique: true
    },
    orderAmount: 
      {
        fromAmount: { 
          type: Number, 
          required: true,
          default: 0.0, 
        },
        toAmount: { 
          type: Number, 
          required: true,
          default: 0.0,
         },
        exchangeRate: { 
          type: Number, 
          required: true,
          default: 0.0, 
        },
        // sendCurrency: {type: String, required: true},
        
        
      },

    sendCountry: { 
        value: { type: String, required: true },
        label: { type: String, required: true },

    },
    
    recipientAddress: {
      firstName: { type: String, required: true },
      middleName: { type: String},
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      town: { type: String, required: true },
      country: { type: String, required: true },
      email: { type: String, required: true },
      mobile: { type: String, required: true },
      reason: { type: String, required: true }
    },

    collectionMethod: {
      type: String,
      required: true,
    },
     
    paymentMethod: {
      type: String,
      //required: true,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // isTrue: {
    //   type: Boolean,
    //   //required: true,
    //   default: false,
    // },
      isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isCollected: {
      type: Boolean,
      //required: true,
      default: false,
    },
    collectionLocation: { type: String },
    collectedAt: {
      type: Date,
    },
     payoutResult: {
        id: { type: String  },
        email: { type: String, required: true  },
        name: { type: String,  required: true},
        payoutSignature : { type: String,  required: true},
        collectionNumber: { type: String, required: true  },
        clientNameCheck: { type: String, required: true  },
        clientIdCheck : { type: String, required: true  },
        
     }
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order