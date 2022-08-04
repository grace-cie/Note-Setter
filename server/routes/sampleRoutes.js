import express from 'express'
export const router = express.Router()

//   @imported functions from contr
import {
     getSample,
     setSample,
     updateSample,
     deleteSample
} from '../controllers/sampleController.js'
//   end


import protect from '../middleware/authMiddleware.js' 
//   @routers
// or router.use(protect)
router.route('/').get(protect, getSample).post(protect,setSample) //protect the routes
router.route('/:id').put(protect, updateSample).delete(protect, deleteSample)
// router.get('/', getSample)
// router.post('/', setSample)
// router.put('/:id', updateSample)
// router.delete('/:id', deleteSample)
export default router
//   end