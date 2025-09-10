const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  async comparePassword(plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.passwordHash);
  }
}

/**
 * Initialize the User model
 * @param {import('sequelize').Sequelize} sequelize
 */
function initUserModel(sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('customer', 'caterer', 'admin'),
        allowNull: false,
        defaultValue: 'customer',
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      specialties: {
        // store as JSON string (array)
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('specialties');
          try { return raw ? JSON.parse(raw) : []; } catch { return []; }
        },
        set(val) {
          this.setDataValue('specialties', Array.isArray(val) ? JSON.stringify(val) : null);
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      responseTime: {
        type: DataTypes.ENUM('Within an hour', 'Within a day', 'Within 3 days', 'Within a week'),
        allowNull: true,
      },
      minGuests: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      maxGuests: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      serviceAreas: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('serviceAreas');
          try { return raw ? JSON.parse(raw) : []; } catch { return []; }
        },
        set(val) {
          this.setDataValue('serviceAreas', Array.isArray(val) ? JSON.stringify(val) : null);
        }
      },
      languages: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('languages');
          try { return raw ? JSON.parse(raw) : []; } catch { return []; }
        },
        set(val) {
          this.setDataValue('languages', Array.isArray(val) ? JSON.stringify(val) : null);
        }
      },
      certifications: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('certifications');
          try { return raw ? JSON.parse(raw) : []; } catch { return []; }
        },
        set(val) {
          this.setDataValue('certifications', Array.isArray(val) ? JSON.stringify(val) : null);
        }
      },
      equipment: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('equipment');
          try { return raw ? JSON.parse(raw) : []; } catch { return []; }
        },
        set(val) {
          this.setDataValue('equipment', Array.isArray(val) ? JSON.stringify(val) : null);
        }
      },
      availability: {
        // e.g., array of date ranges or schedule map
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('availability');
          try { return raw ? JSON.parse(raw) : null; } catch { return null; }
        },
        set(val) {
          this.setDataValue('availability', val ? JSON.stringify(val) : null);
        }
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.changed('passwordHash')) {
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('passwordHash')) {
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
          }
        },
      },
    }
  );

  return User;
}

module.exports = {
  initUserModel,
  User,
};


