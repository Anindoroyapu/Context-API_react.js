import React ,{useContext} from "react";
import { ImageContext } from "";


const Images=()=>{
    const{ response, isLoading, searchImage }= useContext(ImageContext);
    return(
        <>
        <h1 className=" intro">Result for {searchImage ||'cats'}</h1>
        <div className=" ">
            {isLoading ? <Skeleton item={10} /> : response.map((data, key) => <Image key={key} data={data} />)}
        </div>

        </>
        
    )

}



export default Images;
