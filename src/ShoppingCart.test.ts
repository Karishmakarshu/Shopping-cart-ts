import { ShoppingCart } from "./ShoppingCart";  // Adjust based on file structure

global.fetch = jest.fn();

describe("ShoppingCart", () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("adds a product to the cart", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ price: 10 }),
    });

    await cart.addProduct("apple", 2);

    expect(cart.getCartState().items).toEqual([
      { name: "apple", quantity: 2, price: 10 },
    ]);
  });

  test("throws error for invalid quantity", async () => {
    await expect(cart.addProduct("banana", 0)).rejects.toThrow(
      "Invalid quantity: 0. Must be a positive integer."
    );
  });

  test("calculates subtotal, tax, and total correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ price: 20 }),
    });

    await cart.addProduct("mango", 1); // 1 mango @ $20

    const state = cart.getCartState();
    expect(state.subtotal).toBe("20.00");
    expect(state.tax).toBe("2.50"); // 12.5% of 20
    expect(state.total).toBe("22.50");
  });

  test("handles price fetch failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch price for grape"));

    await expect(cart.addProduct("grape", 1)).rejects.toThrow("Failed to fetch price for grape");
  });
});