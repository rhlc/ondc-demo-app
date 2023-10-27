import HttpError from '@wasp/core/HttpError.js'

export const getUserProducts = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  return context.entities.Product.findMany({
    where: {
      user: { id: context.user.id }
    }
  })
}

export const getProduct = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const product = await context.entities.Product.findUnique({
    where: { id: args.productId, userId: context.user.id }
  })

  if (!product) {
    throw new HttpError(400)
  }

  return product;
}