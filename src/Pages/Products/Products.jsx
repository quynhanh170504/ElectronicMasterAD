import React, { useState } from 'react'
// collapse
import { Collapse } from 'react-collapse';
//
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([
    {
      _id: "681426bb1a63c7d17d37f91d",
      name: "Tai Nghe Nhét Tai Có Dây Xiaomi Âm Thanh Sống Động, Jack 3.5mm - Hỗ Trợ Mic, Dùng Cho Học Tập, Giải Trí - Hàng Chính Hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Tai Nghe Có Dây Nhét Tai",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Tai Nghe Có Dây Âm Thanh Sống Động, Mic Đàm Thoại Rõ Nét",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    },
    {
      _id: "681426bb1a63c7d17d37f92d",
      name: "Tai Nghe Nhét Tai Có Dây Xiaomi Âm Thanh Sống Động, Jack 3.5mm - Hỗ Trợ Mic, Dùng Cho Học Tập, Giải Trí - Hàng Chính Hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Tai Nghe Có Dây Nhét Tai",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Tai Nghe Có Dây Âm Thanh Sống Động, Mic Đàm Thoại Rõ Nét",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    },
    {
      _id: "681426bb1a63c7d17d37f93d",
      name: "Tai Nghe Nhét Tai Có Dây Xiaomi Âm Thanh Sống Động, Jack 3.5mm - Hỗ Trợ Mic, Dùng Cho Học Tập, Giải Trí - Hàng Chính Hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Tai Nghe Có Dây Nhét Tai",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Tai Nghe Có Dây Âm Thanh Sống Động, Mic Đàm Thoại Rõ Nét",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    },
    {
      _id: "681426bb1a63c7d17d37f94d",
      name: "Tai Nghe Nhét Tai Có Dây Xiaomi Âm Thanh Sống Động, Jack 3.5mm - Hỗ Trợ Mic, Dùng Cho Học Tập, Giải Trí - Hàng Chính Hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Tai Nghe Có Dây Nhét Tai",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Tai Nghe Có Dây Âm Thanh Sống Động, Mic Đàm Thoại Rõ Nét",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    },
    {
      _id: "681426bb1a63c7d17d37f95d",
      name: "Tai Nghe Nhét Tai Có Dây Xiaomi Âm Thanh Sống Động, Jack 3.5mm - Hỗ Trợ Mic, Dùng Cho Học Tập, Giải Trí - Hàng Chính Hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Tai Nghe Có Dây Nhét Tai",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Tai Nghe Có Dây Âm Thanh Sống Động, Mic Đàm Thoại Rõ Nét",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    },
    {
      _id: "681426bb1a63c7d17d37f96d",
      name: "Tai Nghe Nhét Tai Có Dây Xiaomi Âm Thanh Sống Động, Jack 3.5mm - Hỗ Trợ Mic, Dùng Cho Học Tập, Giải Trí - Hàng Chính Hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Tai Nghe Có Dây Nhét Tai",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Tai Nghe Có Dây Âm Thanh Sống Động, Mic Đàm Thoại Rõ Nét",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    },
    {
      _id: "681426bb1a63c7d17d37f97d",
      name: "Bộ 2 Giá Treo Loa Móc Cao Cấp Xoay 360 độ, chịu trọng lượng loa 45kg bền đẹp - Hàng chính hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Giá treo loa",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Bộ Giá Treo Loa Móc Karaoke là phụ kiện quan trọng để treo được các dòng loa trong gia đình của bạn. Một bộ gồm 2 chiếc có thể đỡ được tối đa 30kg, Với chất liệu là thép dày vô cùng bền bỉ.Giá treo loa xoay 360 độ là một phụ kiện đi kèm chuyên nghiệp cho dàn âm thanh của bạn. Với công nghệ chế tạo cao cấp, được làm từ kim loại chắc chắn có độ cứng cao, ở bên ngoài giá được phủ một lớp sơn tĩnh điện màu đen có tính thẩm mĩ cao. Chiếc giá treo nhờ được chế tạo đặc biệt nên có khả năng nâng được loa có tải trọng lớn tối đa lên đến 15kg, có độ bền cao, chịu lực tốt, đảm bảo an toàn cho bạn trong quá trình sử dụng. Khoảng cách có thể điều chỉnh được của loại giá treo này là từ 130 đến 200mm với độ nghiêng từ 0º đến ± 30º. Do đó, bạn có thể thoải mái điều chỉnh giá treo dễ dàng, để âm thanh thu được có chất lượng tốt nhất, giúp cho dàn âm thanh của bạn trở nên chuyên  nghiệp hơn. Đặc biệt, tay đòn của loại giá này cực chắn chắn và khỏe, dù là bạn có mở loa ở mức nhạc lớn hay độ rung loa mạnh cũng không sợ là loa bị rung khỏi vị trí trên giá, vì nó đã giúp cố định loa rất chắc.</p><p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    }
  ])
  const [productViewerIndex, setProductViewerIndex] = useState(null);
  const isOpenProductView = (index) => {
    if (productViewerIndex === index) setProductViewerIndex(null)
    else setProductViewerIndex(index)
  }
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
        <div className='py-3'>
          <h2 className='py-3 px-3 font-[600] text-[20px]'>Recent Products</h2>
        </div>
        <div className='py-3'>
          <input
            placeholder='Search by name and enter'
            className='ml-1 border p-3'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                // handle search here
                console.log('Search:', e.target.value);
              }
            }}
          />
          <br />
          <Button variant="outlined" className='!m-1'>Search</Button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 dark:text-white dark:bg-gray-800 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 border">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                ElectronicImgs
              </th>
              <th scope="col" className="px-6 py-3 border">
                Available
              </th>
              <th scope="col" className="px-6 py-3 border">
                Main Category
              </th>
              <th scope="col" className="px-6 py-3 border">
                Categories
              </th>
              <th scope="col" className="px-6 py-3 border">
                Price
              </th>
              <th scope="col" className="px-6 py-3 border">
                Quantity Sold
              </th>
              <th scope="col" className="px-6 py-3 border">
                Brand Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                Published Date
              </th>
              <th scope="col" className="px-6 py-3 border">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <>
                  <tr className="border-b border-gray-200 dark:text-white dark:bg-gray-800" index={product.orderid}>
                    <th scope="row" className="dark:text-white dark:bg-gray-800 px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-l border-[rgba(0,0,0,0.2)]">
                      {product.name}
                    </th>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.electronicImgs.map((ig, index) => {
                        return <>
                          <a href={ig.url} className='underline'>image{index + 1}</a>
                          <br />
                        </>
                      })}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.available}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.mainCategory}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.categories.map(cate => {
                        return <p>{cate}</p>
                      })}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.quantitySold}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.brandName}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.publishDate}
                    </td>
                    <td className="px-6 py-4 border-l border-r border-[rgba(0,0,0,0.2)]">
                      <p href="#" className="font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => isOpenProductView(product._id)}>{productViewerIndex === product._id ? 'Close' : 'View'}</p>
                    </td>
                  </tr>
                  <Collapse isOpened={productViewerIndex === product._id ? true : false}>
                    <div className='w-full p-4 border-l border-r border-[rgba(0,0,0,0.2)]'>
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="Name"
                          variant="standard"
                          className="!w-full"
                          multiline
                          value={product.name}
                          onChange={(e) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p._id === product._id ? { ...p, name: e.target.value } : p
                              )
                            )
                          }
                        />
                        <TextField
                          label="Available"
                          variant="standard"
                          className="!w-full"
                          type="number"
                          value={product.available}
                          onChange={(e) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p._id === product._id ? { ...p, available: e.target.value } : p
                              )
                            )
                          }
                        />
                        <TextField
                          label="Price"
                          variant="standard"
                          className="!w-full"
                          type="number"
                          value={product.price}
                          onChange={(e) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p._id === product._id ? { ...p, price: e.target.value } : p
                              )
                            )
                          }
                        />
                        <TextField
                          label="Brand Name"
                          variant="standard"
                          className="!w-full"
                          value={product.brandName}
                          onChange={(e) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p._id === product._id ? { ...p, brandName: e.target.value } : p
                              )
                            )
                          }
                        />
                      </div>
                      <TextField
                        label="Description"
                        variant="standard"
                        className='!w-full'
                        multiline
                        value={product.description}
                      />
                      <Button variant='contained' className='!mt-4 !mr-4'>Update</Button>
                      <Button variant='outlined' className='!mt-4' onClick={() => isOpenProductView(product._id)}>Close</Button>
                    </div>
                  </Collapse>

                </>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products