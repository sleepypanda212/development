export default function ClothingItem({item, addItem}) {
    
	return (
		<div class="gallery-item-container">
            {item.map((Val) => {
                return (
                    <div class="gallery-item"
                    key={Val.name}>
                    <h3>{Val.name}</h3>
                    {Val.description}
                    <br></br>
                    <img class="itemImg" src={Val.image}></img>                    <br></br>
                    <div3>Color: {Val.color} <br></br>
                    Type: {Val.category}
                    </div3><br></br>
                    <div class="itemDetContainer">
                    <div2 class="itemDet1">${Val.price}</div2>
                    <div class="itemDet2">
                    <button class="AddToCartButton" onClick={() => addItem(Val)}>Add To Cart</button>
                    </div>
                  </div>
                  </div>
                )
            })}
		</div>
	);
}
