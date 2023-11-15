

export const getCartItems = async () => {
    // try {
    const res = await fetch('/api/getcartitems', {
        next: {
            revalidate: 120
        }
    });
    return res;
}

export const addCartItem = async (id: string, priceAndSize: {}, quantity: number,) => {
    const res = await fetch('/api/addcartitem', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_id: id,
            priceAndSize: priceAndSize,
            quantity: quantity,
        })
    });
    return res;
}

export const deleteCartItem = async (id: string, priceAndSize: {}, quantity: number,) => {
    const res = await fetch('/api/deletecartitem', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_id: id,
            priceAndSize: priceAndSize,
            quantity: quantity,
        })
    });
    return res;
}

export const decreaseItemInCart = async (id: string, priceAndSize: {}, quantity: number,) => {
    const res = await fetch('/api/decreasecartitem', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_id: id,
            priceAndSize: priceAndSize,
            quantity: quantity,
        })
    });
    return res;
}