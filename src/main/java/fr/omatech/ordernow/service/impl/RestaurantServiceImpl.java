package fr.omatech.ordernow.service.impl;

import fr.omatech.ordernow.service.RestaurantService;
import fr.omatech.ordernow.domain.Restaurant;
import fr.omatech.ordernow.repository.RestaurantRepository;
import fr.omatech.ordernow.service.dto.RestaurantDTO;
import fr.omatech.ordernow.service.mapper.RestaurantMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Restaurant}.
 */
@Service
@Transactional
public class RestaurantServiceImpl implements RestaurantService {

    private final Logger log = LoggerFactory.getLogger(RestaurantServiceImpl.class);

    private final RestaurantRepository restaurantRepository;

    private final RestaurantMapper restaurantMapper;

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository, RestaurantMapper restaurantMapper) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantMapper = restaurantMapper;
    }

    /**
     * Save a restaurant.
     *
     * @param restaurantDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RestaurantDTO save(RestaurantDTO restaurantDTO) {
        log.debug("Request to save Restaurant : {}", restaurantDTO);
        Restaurant restaurant = restaurantMapper.toEntity(restaurantDTO);
        restaurant = restaurantRepository.save(restaurant);
        return restaurantMapper.toDto(restaurant);
    }

    /**
     * Get all the restaurants.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RestaurantDTO> findAll() {
        log.debug("Request to get all Restaurants");
        return restaurantRepository.findAll().stream()
            .map(restaurantMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one restaurant by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RestaurantDTO> findOne(Long id) {
        log.debug("Request to get Restaurant : {}", id);
        return restaurantRepository.findById(id)
            .map(restaurantMapper::toDto);
    }

    /**
     * Delete the restaurant by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Restaurant : {}", id);
        restaurantRepository.deleteById(id);
    }
}
