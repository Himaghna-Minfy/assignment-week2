const User = require('../models/user.model');
const { z } = require('zod');

// Accept email or name
const searchQuerySchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional()
}).refine(data => data.email || data.name, {
  message: "Either email or name must be provided"
});

exports.searchUser = async (req, res) => {
  const result = searchQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  const { email, name } = result.data;

  try {
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(name ? [{ firstName: { $regex: new RegExp(name, 'i') } }] : [])
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "Phew! Your partner is not on the list." });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
};
