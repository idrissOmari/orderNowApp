package fr.omatech.ordernow.service;

import fr.omatech.ordernow.service.dto.RestaurantTableDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.omatech.ordernow.domain.RestaurantTable}.
 */
public interface RestaurantTableService {

    /**
     * Save a restaurantTable.
     *
     * @param restaurantTableDTO the entity to save.
     * @return the persisted entity.
     */
    RestaurantTableDTO save(RestaurantTableDTO restaurantTableDTO);

    /**
     * Get all the restaurantTables.
     *
     * @return the list of entities.
     */
    List<RestaurantTableDTO> findAll();

    /**
     * Get the "id" restaurantTable.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RestaurantTableDTO> findOne(Long id);

    /**
     * Delete the "id" restaurantTable.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
