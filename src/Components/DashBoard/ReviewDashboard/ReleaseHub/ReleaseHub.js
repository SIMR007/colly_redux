import React from 'react'
import commonimagepath from '../../../commonimagepath/commonimagepath'

const ReleaseHub = () => {
  return (
    <section>
    <div className="container">
        <div className="row align-items-stretch">
            <div className="col-xl-5 col-lg-6 col-md-7 ">
                <div className='row'>
                    <div className='col-md-7'>
                    <div className="sidebar_left">
                    <h2 className="mb-4 sidebar_hubs">Release Hub</h2>
                    <div className="sidebar_left_tabs">
                        <p className="m-0 mt-2">RECENT RELEASES</p>
                        <button className="action">Balenciaga: Fall 2021</button>
                        <button>Triple S Sneakers</button>
                        <button>Track Trainers</button>
                        <button>IKEA Collaboration Tote Bag</button>
                        <button>Speed Trainer</button>
                        <button>Hourglass Bag</button>
                        <button>Sinners Capsule Collection</button>
                    </div>
                </div>
                    </div>
                    <div className='col-md-5 '>
                    <div className=" p-0 h-100">
                <div className="sidebar_Sections">
                    <h5 className="mb-3">Sections</h5>
                    <div className="sidebar_Sections_Collection dark_1">
                        <input type="radio" value="overview" name="radio" id="Overview" />
                        <label htmlFor="Overview">
                            Overview
                        </label>
                    </div>
                    <div className="sidebar_Sections_Collection dark_2">
                        <input type="radio" value="collection" name="radio" id="Collection" />
                        <label htmlFor="Collection">
                            Collection
                        </label>
                        <p >Constantly pushing creative boundaries to deliver unique and trendsetting designs.</p>
                    </div>
                    <div className="sidebar_Sections_Collection dark_3">
                        <input type="radio" name="radio" value="release" id="Release" />
                        <label htmlFor="Release">
                            Release
                        </label>
                        <p>Constantly pushing creative boundaries to deliver unique and trendsetting designs.</p>
                    </div>
                    <div className="sidebar_Sections_Collection dark_4">
                        <input type="radio" name="radio" value="distribution" id="Distribution  " />
                        <label htmlFor="Distribution  ">
                            Distribution
                        </label>
                        <p>Constantly pushing creative boundaries to deliver unique and trendsetting designs.</p>
                    </div>
                    </div>
                    </div>
                </div>
       
          
           
            </div>
            </div>
            <div className="col-xl-7 col-lg-6 ">
                    <div className="Balenciaga">
                        <h2>Balenciaga: Fall 2021 </h2>
                        <p>Overview</p>
                        <p>Balenciaga's Fall 2021 release line is a bold testament to the brand's commitment to pushing
                            the boundaries of fashion. This season, they've curated a collection that seamlessly blends
                            avant-garde design with functional streetwear.</p>
                      
                        <img src={commonimagepath("Balenciaga.png")} alt="Balenciaga" />
                        <p>Footwear takes center stage with the revival of the iconic Triple S Sneakers, showcasing new
                            colorways and intricate detailing. The juxtaposition of oversized soles and sleek
                            silhouettes adds a dynamic edge to this cult-favorite.</p>
                        <p>In the realm of outerwear, Balenciaga introduces the Quantum Gravity Jacket—an innovative
                            piece that not only defies traditional design norms but also incorporates cutting-edge
                            technology for a truly futuristic aesthetic. It's fashion-meets-function in the most
                            captivating way.</p>
                        <p>Accessories follow suit with the Meta-Canvas Backpack, featuring digital art panels that
                            react to the environment, creating a personalized and ever-changing visual experience. It's
                            not just a backpack; it's a wearable masterpiece.</p>
                        <p>The Fall 2021 release line also sees a nod to sustainability with the introduction of the
                            Eco-Chic Sweater series, crafted from recycled materials without compromising on style.
                            Balenciaga continues to prove that fashion can be both trendsetting and eco-conscious.</p>
                    </div>
                </div>
        </div>
        </div>
</section>
  )
}

export default ReleaseHub