package fr.omatech.ordernow.service;

import fr.omatech.ordernow.service.dto.RestaurantDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.omatech.ordernow.domain.Restaurant}.
 */
public interface RestaurantService {

    /**
     * Save a restaurant.
     *
     * @param restaurantDTO the entity to save.
     * @return the persisted entity.
     */
    RestaurantDTO save(RestaurantDTO restaurantDTO);

    /**
     * Get all the restaurants.
     *
     * @return the list of entities.
     */
    List<RestaurantDTO> findAll();

    /**
     * Get the "id" restaurant.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RestaurantDTO> findOne(Long id);

    /**
     * Delete the "id" restaurant.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
