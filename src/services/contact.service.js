import Contact from "../models/contact";

class ContactService {
  static async getAll() {
    try {
      return await Contact.find();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const contact = await Contact.findById(id);
      return contact;
    } catch (error) {
      throw error;
    }
  }

  static async addContact(data) {
    try {
      const contact = new Contact(data);
      return await contact.save();
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const contact = await Contact.findById({ _id: id });
      contact.set(data);
      const result = await contact.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await Contact.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }
}

export default  ContactService;
