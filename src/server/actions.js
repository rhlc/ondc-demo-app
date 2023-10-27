import HttpError from '@wasp/core/HttpError.js'

export const createProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Product.create({
    data: {
      title: args.title,
      description: args.description,
      price: args.price,
      userId: context.user.id
    }
  });
}

export const updateProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: args.id }
  });
  if (product.userId !== context.user.id) { throw new HttpError(400) };

  return context.entities.Product.update({
    where: { id: args.id },
    data: { title: args.title, description: args.description, price: args.price }
  });
}

export const deleteProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: args.productId }
  });

  if (!product) { throw new HttpError(400) };

  if (product.userId !== context.user.id) { throw new HttpError(400) };

  await context.entities.Product.delete({
    where: { id: args.productId }
  });
}