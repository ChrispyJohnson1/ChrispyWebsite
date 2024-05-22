import personal_photo from '../resources/personal_photo.jpg'
import grad_photo from '../resources/grad_photo.jpg'
import professional_photo from '../resources/professional_photo.jpg'

// ImageInfo is an object that contains the links (local or otherwise) to the
// images used for the ImageStack.
// source: https://bricampgomez.com/blog/how-to-overlap-images-in-css/
export default function ImageStack({ImageInfo}) {
    return (
        <div className = 'image-stack'>
            {/* Image One: School */}
            <div className = 'image-stack-image-one'>
                <img src={personal_photo} alt = 'Christopher Johnson wearing a plaid top, looking at the camera with a slight smile.'></img>
            </div>

            {/* Image Two: Tech */}
            <div className = 'image-stack-image-two'>
                <img src={grad_photo} alt = 'Christopher Johnson in graduation attire, with a wide smile.'></img>
            </div>

            {/* Image Three: Personal/Fun */}
            <div className = 'image-stack-image-three'>
                <img src={professional_photo} alt = 'Christopher Johnson with a slight smile, looking at the camera. He is wearing a white collared shirt, a blue tie, and a jacket.'></img>
            </div>

        </div>
    );
}