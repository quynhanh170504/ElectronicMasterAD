
//create a new electronic
// electronicRouter.post('/', upload.fields([{ name: "electronicImgs", maxCount: 4 }]), protect, checkRole('admin'), createElectronic)

//update electronic
// electronicRouter.patch('/:id', upload.fields([{ name: "electronicImgs", maxCount: 4 }]), protect, checkRole('admin'), updateElectronic)

//delete electronic
// electronicRouter.delete('/:id', protect, checkRole('admin'), deleteElectronic)

const ElectronicEndpoint = {
  createElectronic: '/admin/electronic',
  updateElectronic: (id) => `/admin/electronic/${id}`,
  deleteElectronic: (id) => `/admin/electronic/${id}`,
  deleteElecImg: (id) => `/admin/electronic/delete-image/${id}`
}

export default ElectronicEndpoint