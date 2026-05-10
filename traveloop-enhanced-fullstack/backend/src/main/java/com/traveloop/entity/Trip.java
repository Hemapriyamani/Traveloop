
package com.traveloop.entity;

import jakarta.persistence.*;

@Entity
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tripName;
    private String city;
    private Double budget;

    public Long getId() { return id; }

    public String getTripName() { return tripName; }

    public void setTripName(String tripName) {
        this.tripName = tripName;
    }

    public String getCity() { return city; }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getBudget() { return budget; }

    public void setBudget(Double budget) {
        this.budget = budget;
    }
}
