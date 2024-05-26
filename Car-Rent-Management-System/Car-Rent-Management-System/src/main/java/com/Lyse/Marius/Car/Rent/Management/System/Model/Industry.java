package com.Lyse.Marius.Car.Rent.Management.System.Model;

public enum Industry {
    Toyota_Motor_Corporation("Toyota Motor Corporation"),
    BMW("BMW"),
    Hyundai_Motor_Group("Hyundai Motor Group"),
    Ford_Motor_Company("Ford Motor Company"),
    Volkswagen_Group("Volkswagen Group"),
    Mercedes_Benz("Mercedes Benz");

    private final String displayName;

    Industry(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    // Add a method to get the enum value from the display name
    public static Industry fromDisplayName(String displayName) {
        for (Industry industry : Industry.values()) {
            if (industry.displayName.equalsIgnoreCase(displayName)) {
                return industry;
            }
        }
        throw new IllegalArgumentException("No constant with displayName " + displayName + " found");
    }
}

// package com.Lyse.Marius.Car.Rent.Management.System.Model;

// public enum Industry {
// Toyota_Motor_Corporation,
// BMW
// // Hyundai_Motor_Group,
// // Ford_Motor_Company,
// // Volkswagen_Group,
// // Mercedes_Benz
// }
