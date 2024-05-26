package com.Lyse.Marius.Car.Rent.Management.System.Model;

public enum CarModel {
    Toyota_Camry("Toyota Camry"),
    Toyota_Corolla("Toyota Corolla"),
    Toyota_RAV4("Toyota RAV4"),
    Volkswagen_Golf("Volkswagen Golf"),
    Volkswagen_Passat("Volkswagen Passat"),
    Audi_A4("Audi A4"),
    Audi_Q5("Audi Q5"),
    Bentley_Continental_GT("Bentley Continental GT"),
    Ford_Explorer("Ford Explorer"),
    Ford_Mustang("Ford Mustang"),
    BMW_3_Series("BMW 3 Series"),
    BMW_X5("BMW X5"),
    Hyundai_Sonata("Hyundai Sonata"),
    Kia_Sportage("Kia Sportage"),
    Mercedes_Benz_GLE("Mercedes Benz GLE"),
    Mercedes_Benz_GLC("Mercedes Benz GLC");

    private final String displayName;

    CarModel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    // Add a method to get the enum value from the display name
    public static CarModel fromDisplayName(String displayName) {
        for (CarModel model : CarModel.values()) {
            if (model.displayName.equalsIgnoreCase(displayName)) {
                return model;
            }
        }
        throw new IllegalArgumentException("No constant with displayName " + displayName + " found");
    }
}

// package com.Lyse.Marius.Car.Rent.Management.System.Model;

// public enum CarModel {
// Toyota_Camry,
// Toyota_Corolla
// // Toyota_RAV4,
// // Toyota_Prius,
// // Toyota_Tacoma,
// // Toyota_Highlander,
// // Volkswagen_Golf,
// // Volkswagen_Passat,
// // Audi_A4,
// // Audi_Q5,
// // Porsche_911,
// // Bentley_Continental_GT,
// // Chevrolet_Silverado,
// // Chevrolet_Equinox,
// // GMC_Sierra,
// // Cadillac_Escalade,
// // Buick_Enclave,
// // Chevrolet_Malibu,
// // Ford_F_150,
// // Ford_Escape,
// // Ford_Explorer,
// // Ford_Mustang,
// // Lincoln_Navigator,
// // Ford_Edge,
// // Honda_Accord,
// // Honda_Civic,
// // Honda_Pilot,
// // Honda_Odyssey,
// // Acura_MDX,
// // BMW_3_Series,
// // BMW_5_Series,
// // BMW_X5,
// // BMW_7_Series,
// // MINI_Cooper,
// // Hyundai_Sonata,
// // Kia_Sportage,
// // Mercedes_Benz_GLE,
// // Mercedes_Benz_GLC
// }
