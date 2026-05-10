
package com.traveloop.controller;

import com.traveloop.entity.Trip;
import com.traveloop.repository.TripRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin("*")
public class TripController {

    private final TripRepository repo;

    public TripController(TripRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Trip> getTrips() {
        return repo.findAll();
    }

    @PostMapping
    public Trip addTrip(@RequestBody Trip trip) {
        return repo.save(trip);
    }
}
